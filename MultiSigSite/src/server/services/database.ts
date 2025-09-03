import { Database } from 'sqlite3';
import crypto from 'crypto';
import { promisify } from 'util';

export class DatabaseService {
  private db: Database | null = null;
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm';
  private readonly KEY_LENGTH = 32;
  private readonly IV_LENGTH = 16;
  private readonly SALT_LENGTH = 64;
  private readonly TAG_LENGTH = 16;

  constructor() {
    this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    try {
      this.db = new Database('wallet.db');
      await this.createTables();
    } catch (error) {
      console.error('Database initialization error:', error);
      throw new Error('Failed to initialize database');
    }
  }

  private async createTables(): Promise<void> {
    const createWalletTable = `
      CREATE TABLE IF NOT EXISTS wallets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        wallet_data TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id)
      )
    `;

    const createAuditLogTable = `
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        action TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    try {
      await this.runQuery(createWalletTable);
      await this.runQuery(createAuditLogTable);
    } catch (error) {
      console.error('Error creating tables:', error);
      throw new Error('Failed to create database tables');
    }
  }

  private async runQuery(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      this.db.run(query, params, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this);
      });
    });
  }

  private async getQuery(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }

      this.db.get(query, params, (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      });
    });
  }

  private generateEncryptionKey(): Buffer {
    const salt = crypto.randomBytes(this.SALT_LENGTH);
    const key = crypto.pbkdf2Sync(
      process.env.ENCRYPTION_KEY || 'your-secure-encryption-key',
      salt,
      100000,
      this.KEY_LENGTH,
      'sha512'
    );
    return key;
  }

  private encryptCredentials(credentials: any): string {
    const key = this.generateEncryptionKey();
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.ENCRYPTION_ALGORITHM, key, iv);
    
    const encrypted = Buffer.concat([
      cipher.update(JSON.stringify(credentials), 'utf8'),
      cipher.final()
    ]);
    
    const tag = cipher.getAuthTag();
    
    // Combine IV, encrypted data, and auth tag
    const result = Buffer.concat([iv, tag, encrypted]);
    return result.toString('base64');
  }

  private decryptCredentials(encryptedData: string): any {
    const key = this.generateEncryptionKey();
    const buffer = Buffer.from(encryptedData, 'base64');
    
    const iv = buffer.slice(0, this.IV_LENGTH);
    const tag = buffer.slice(this.IV_LENGTH, this.IV_LENGTH + this.TAG_LENGTH);
    const encrypted = buffer.slice(this.IV_LENGTH + this.TAG_LENGTH);
    
    const decipher = crypto.createDecipheriv(this.ENCRYPTION_ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final()
    ]);
    
    return JSON.parse(decrypted.toString('utf8'));
  }

  public async storeWalletData(userId: string, walletData: any): Promise<void> {
    const encryptedData = this.encryptCredentials(walletData);
    const query = `
      INSERT OR REPLACE INTO wallets (user_id, wallet_data)
      VALUES (?, ?)
    `;
    
    try {
      await this.runQuery(query, [userId, encryptedData]);
    } catch (error) {
      console.error('Error storing wallet data:', error);
      throw new Error('Failed to store wallet data');
    }
  }

  public async getWalletData(userId: string): Promise<any> {
    const query = `
      SELECT wallet_data FROM wallets
      WHERE user_id = ?
    `;
    
    try {
      const result = await this.getQuery(query, [userId]);
      if (!result) {
        return null;
      }
      return this.decryptCredentials(result.wallet_data);
    } catch (error) {
      console.error('Error retrieving wallet data:', error);
      throw new Error('Failed to retrieve wallet data');
    }
  }

  public async logAuditEvent(userId: string, action: string, ipAddress?: string, userAgent?: string): Promise<void> {
    const query = `
      INSERT INTO audit_logs (user_id, action, ip_address, user_agent)
      VALUES (?, ?, ?, ?)
    `;
    
    try {
      await this.runQuery(query, [userId, action, ipAddress, userAgent]);
    } catch (error) {
      console.error('Error logging audit event:', error);
      // Don't throw error for audit logging failures
    }
  }
} 