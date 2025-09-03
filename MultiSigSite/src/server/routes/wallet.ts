import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { storeWalletData, getWalletData, deleteWallet } from '../models/wallet';

const router = express.Router();

// Store wallet data
router.post('/store', authenticateToken, async (req, res) => {
  try {
    const { walletData } = req.body;
    const userId = req.user.id;

    if (!walletData || !walletData.type || !walletData.value) {
      return res.status(400).json({
        success: false,
        error: 'Invalid wallet data provided'
      });
    }

    const wallet = await storeWalletData(userId, walletData);
    res.json({
      success: true,
      wallet: {
        id: wallet.id,
        type: wallet.type,
        created_at: wallet.created_at
      }
    });
  } catch (error) {
    console.error('Error storing wallet:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to store wallet data'
    });
  }
});

// Get wallet data
router.get('/:walletId', authenticateToken, async (req, res) => {
  try {
    const { walletId } = req.params;
    const userId = req.user.id;

    const wallet = await getWalletData(userId, walletId);
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      });
    }

    res.json({
      success: true,
      wallet: {
        id: wallet.id,
        type: wallet.type,
        data: wallet.encrypted_data,
        created_at: wallet.created_at
      }
    });
  } catch (error) {
    console.error('Error retrieving wallet:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve wallet data'
    });
  }
});

// Delete wallet
router.delete('/:walletId', authenticateToken, async (req, res) => {
  try {
    const { walletId } = req.params;
    const userId = req.user.id;

    const success = await deleteWallet(userId, walletId);
    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Wallet not found'
      });
    }

    res.json({
      success: true,
      message: 'Wallet deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting wallet:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete wallet'
    });
  }
});

export default router; 