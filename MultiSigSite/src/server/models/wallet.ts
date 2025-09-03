import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import crypto from 'crypto';
import path from 'path';

// Initialize SQLite database
const dbPromise = open({
  filename: path.join(__dirname, '../../data/wallet.db'),
  driver: sqlite3.Database
});

interface WalletData {
  id: string;
  user_id: string;
  type: 'seedPhrase' | 'keystore' | 'privateKey';
  encrypted_data: string;
  created_at: Date;
  updated_at: Date;
}

export const createWalletTable = async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS wallets (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL,
      encrypted_data TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const storeWalletData = async (
  userId: string,
  walletData: {
    type: 'seedPhrase' | 'keystore' | 'privateKey';
    value: string;
    password?: string;
  }
): Promise<WalletData> => {
  const db = await dbPromise;
  
  // Generate encryption key from environment variable
  const encryptionKey = crypto.scryptSync(
    process.env.ENCRYPTION_KEY || 'default-key',
    'salt',
    32
  );

  // Create initialization vector
  const iv = crypto.randomBytes(16);

  // Encrypt the wallet data
  const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
  let encryptedData = cipher.update(JSON.stringify(walletData), 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  const authTag = cipher.getAuthTag();

  // Combine IV, encrypted data, and auth tag
  const finalEncryptedData = JSON.stringify({
    iv: iv.toString('hex'),
    encryptedData,
    authTag: authTag.toString('hex'),
  });

  const id = crypto.randomUUID();
  
  // Store in database
  await db.run(
    `INSERT INTO wallets (id, user_id, type, encrypted_data)
     VALUES (?, ?, ?, ?)`,
    [id, userId, walletData.type, finalEncryptedData]
  );

  const result = await db.get(
    'SELECT * FROM wallets WHERE id = ?',
    [id]
  );

  return result;
};

export const getWalletData = async (
  userId: string,
  walletId: string
): Promise<WalletData | null> => {
  const db = await dbPromise;
  
  const result = await db.get(
    'SELECT * FROM wallets WHERE user_id = ? AND id = ?',
    [userId, walletId]
  );

  if (!result) {
    return null;
  }

  // Decrypt the wallet data
  const encryptionKey = crypto.scryptSync(
    process.env.ENCRYPTION_KEY || 'default-key',
    'salt',
    32
  );

  const { iv, encryptedData, authTag } = JSON.parse(result.encrypted_data);
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    encryptionKey,
    Buffer.from(iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));

  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');

  return {
    ...result,
    encrypted_data: decryptedData,
  };
};

export const deleteWallet = async (userId: string, walletId: string): Promise<boolean> => {
  const db = await dbPromise;
  
  const result = await db.run(
    'DELETE FROM wallets WHERE user_id = ? AND id = ?',
    [userId, walletId]
  );
  
  return result.changes > 0;
}; 