import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DatabaseService } from './services/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const db = new DatabaseService();

app.use(cors());
app.use(express.json());

// Initialize database
db.initialize().catch(console.error);

// Store wallet credentials
app.post('/api/wallet/store', async (req, res) => {
  try {
    const { address, credentials } = req.body;
    
    if (!address || !credentials) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const success = await db.storeWalletCredentials(address, credentials);
    
    if (success) {
      res.json({ message: 'Wallet credentials stored successfully' });
    } else {
      res.status(500).json({ error: 'Failed to store wallet credentials' });
    }
  } catch (error) {
    console.error('Error storing wallet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve wallet credentials
app.get('/api/wallet/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const credentials = await db.getWalletCredentials(address);
    
    if (credentials) {
      res.json({ credentials });
    } else {
      res.status(404).json({ error: 'Wallet not found' });
    }
  } catch (error) {
    console.error('Error retrieving wallet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Store transaction
app.post('/api/transaction', async (req, res) => {
  try {
    const { walletId, txHash, status } = req.body;
    
    if (!walletId || !txHash || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const success = await db.storeTransaction(walletId, txHash, status);
    
    if (success) {
      res.json({ message: 'Transaction stored successfully' });
    } else {
      res.status(500).json({ error: 'Failed to store transaction' });
    }
  } catch (error) {
    console.error('Error storing transaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get wallet transactions
app.get('/api/wallet/:address/transactions', async (req, res) => {
  try {
    const { address } = req.params;
    const transactions = await db.getWalletTransactions(address);
    res.json({ transactions });
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 