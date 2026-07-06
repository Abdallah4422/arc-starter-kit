# Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- Circle Developer Console account

## Step-by-Step

### 1. Get Testnet USDC
Visit https://faucet.circle.com and request testnet USDC for your wallet address[citation:4]

### 2. Configure API Keys
1. Go to Circle Developer Console
2. Create an API key
3. Add to `.env` file

### 3. Run Examples
See README for commands

## Common Issues

### "Insufficient balance"
- Visit faucet.circle.com to refill
- Remember: Arc uses USDC for gas[citation:4]

### "Chain ID mismatch"
- Ensure you're using chain ID 5042002
- Check RPC URL is correct

### "Private key invalid"
- Private key must start with `0x`
- Ensure key is funded on Arc testnet
