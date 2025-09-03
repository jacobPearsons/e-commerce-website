from typing import Dict, Any, Optional
from web3 import Web3
from eth_account import Account
import json
import os
from src.config.settings import MAX_SLIPPAGE, GAS_LIMIT, GAS_PRICE_MULTIPLIER

class BuyBot:
    def __init__(self, rpc_url: str, private_key: str):
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        self.account = Account.from_key(private_key)
        self.address = self.account.address
        
        # Load router ABI
        with open('src/contracts/router_abi.json', 'r') as f:
            self.router_abi = json.load(f)
        
        # Load token ABI
        with open('src/contracts/token_abi.json', 'r') as f:
            self.token_abi = json.load(f)

    def get_token_balance(self, token_address: str) -> float:
        """Get token balance for the bot wallet"""
        try:
            token_contract = self.w3.eth.contract(
                address=Web3.to_checksum_address(token_address),
                abi=self.token_abi
            )
            balance = token_contract.functions.balanceOf(self.address).call()
            decimals = token_contract.functions.decimals().call()
            return balance / (10 ** decimals)
        except Exception as e:
            print(f"Error getting token balance: {e}")
            return 0

    def get_native_balance(self) -> float:
        """Get native token balance (ETH/SOL)"""
        try:
            balance = self.w3.eth.get_balance(self.address)
            return self.w3.from_wei(balance, 'ether')
        except Exception as e:
            print(f"Error getting native balance: {e}")
            return 0

    def execute_buy(self, token_address: str, amount: float) -> Optional[str]:
        """Execute a buy order"""
        try:
            # Get current gas price
            gas_price = self.w3.eth.gas_price
            adjusted_gas_price = int(gas_price * GAS_PRICE_MULTIPLIER)

            # Prepare transaction
            router_address = Web3.to_checksum_address(os.getenv("ROUTER_ADDRESS"))
            router = self.w3.eth.contract(
                address=router_address,
                abi=self.router_abi
            )

            # Calculate amount with slippage
            amount_in = self.w3.to_wei(amount, 'ether')
            amount_out_min = int(amount_in * (1 - MAX_SLIPPAGE))

            # Build transaction
            tx = router.functions.swapExactETHForTokens(
                amount_out_min,
                [self.w3.eth.weth9, token_address],
                self.address,
                int(self.w3.eth.get_block('latest').timestamp) + 300  # 5 minutes deadline
            ).build_transaction({
                'from': self.address,
                'value': amount_in,
                'gas': GAS_LIMIT,
                'gasPrice': adjusted_gas_price,
                'nonce': self.w3.eth.get_transaction_count(self.address)
            })

            # Sign and send transaction
            signed_tx = self.w3.eth.account.sign_transaction(tx, self.account.key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            
            # Wait for transaction receipt
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            return receipt.transactionHash.hex()
        except Exception as e:
            print(f"Error executing buy: {e}")
            return None

    def execute_sell(self, token_address: str, amount: float) -> Optional[str]:
        """Execute a sell order"""
        try:
            # Get current gas price
            gas_price = self.w3.eth.gas_price
            adjusted_gas_price = int(gas_price * GAS_PRICE_MULTIPLIER)

            # Prepare transaction
            router_address = Web3.to_checksum_address(os.getenv("ROUTER_ADDRESS"))
            router = self.w3.eth.contract(
                address=router_address,
                abi=self.router_abi
            )

            # Calculate amount with slippage
            token_contract = self.w3.eth.contract(
                address=Web3.to_checksum_address(token_address),
                abi=self.token_abi
            )
            decimals = token_contract.functions.decimals().call()
            amount_in = int(amount * (10 ** decimals))
            amount_out_min = int(amount_in * (1 - MAX_SLIPPAGE))

            # Build transaction
            tx = router.functions.swapExactTokensForETH(
                amount_in,
                amount_out_min,
                [token_address, self.w3.eth.weth9],
                self.address,
                int(self.w3.eth.get_block('latest').timestamp) + 300  # 5 minutes deadline
            ).build_transaction({
                'from': self.address,
                'gas': GAS_LIMIT,
                'gasPrice': adjusted_gas_price,
                'nonce': self.w3.eth.get_transaction_count(self.address)
            })

            # Sign and send transaction
            signed_tx = self.w3.eth.account.sign_transaction(tx, self.account.key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            
            # Wait for transaction receipt
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            return receipt.transactionHash.hex()
        except Exception as e:
            print(f"Error executing sell: {e}")
            return None
