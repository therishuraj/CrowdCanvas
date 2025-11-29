# Parent Wallet Setup Guide

## Why You Need This

The **parent wallet** receives payments from users creating tasks and pays out workers. Without the private key configured, payouts will fail.

---

## Quick Setup

### Step 1: Export Private Key from Phantom Wallet

1. **Open Phantom Wallet** (the one with address: `85aWtadfPvwsXSBwQH6GcuhuuHwXb3yWNK1Nd1pLgn15`)

2. **Click Settings** (⚙️ icon)

3. **Security & Privacy** → **Export Private Key**

4. **Enter your password** to reveal the private key

5. **Copy the private key** - It will be in one of two formats:
   - **Array format**: `[123,45,67,...]` (64 numbers)
   - **Base58 format**: `5Kj7x...` (long alphanumeric string)
   
   Both formats are supported!

### Step 2: Add to Backend .env File

1. **Open** `/backend/.env` file

2. **Add this line** (keep the format exactly as copied):
   ```env
   # If array format (64 numbers):
   PARENT_WALLET_PRIVATE_KEY=[123,45,67,89,...]
   
   # OR if base58 format:
   PARENT_WALLET_PRIVATE_KEY=5Kj7xYz9aB2c3D4e...
   ```

3. **Important**: 
   - Don't add quotes around array format
   - Don't modify the numbers or string
   - The key should be exactly 64 bytes

4. **Save the file**

### Step 3: Restart Backend

```bash
cd backend
npx ts-node src/index.ts
```

---

## ⚠️ SECURITY WARNING

**NEVER commit the .env file to git or share your private key!**

- The `.gitignore` already excludes `.env` files
- Keep your private key secret
- Use this wallet ONLY for Devnet testing
- For production, use a dedicated wallet with proper key management

---

## Example .env File

```env
# MongoDB
MONGODB_URI=mongodb+srv://nexus:nexus5@cluster0.kei0rsa.mongodb.net/crowdcanvas

# JWT Secrets
JWT_SECRET=rishu
WORKER_JWT_SECRET=raj

# Solana
SOLANA_RPC_URL=https://api.devnet.solana.com
PARENT_WALLET_PRIVATE_KEY=5J7xK...your-actual-private-key...9aB2c

# AWS S3 (Optional - for image uploads)
# AWS_ACCESS_KEY_ID=
# AWS_SECRET_ACCESS_KEY=
# AWS_REGION=eu-north-1
# AWS_BUCKET_NAME=

# Server
PORT=3001
NODE_ENV=development
```

---

## How Payouts Work

1. **Worker completes tasks** → Earnings accumulate in `pendingAmount`
2. **Worker clicks "Request Payout"** → Backend creates transaction
3. **Parent wallet sends SOL** to worker's wallet address
4. **Transaction recorded** in Payout collection
5. **Worker sees balance update** to 0 (money transferred)

### Current Flow:
- User pays **0.1 SOL** to create task
- Each of **100 workers** earns **0.001 SOL** per submission
- Workers accumulate earnings and request payouts
- Parent wallet pays out from the received funds

---

## Troubleshooting

### "No pending amount to payout"
- Complete at least one task first
- Check balance in Appbar shows > 0

### "Parent wallet private key not set"
- Add PARENT_WALLET_PRIVATE_KEY to .env
- Restart backend server

### "bad secret key size"
- Private key must be exactly 64 bytes
- Check that you copied the **complete** private key
- Array format should have 64 numbers: `[1,2,3,...,64]`
- Base58 format should be complete string
- Don't add quotes, spaces, or newlines
- Example valid formats:
  ```
  PARENT_WALLET_PRIVATE_KEY=[123,45,67,...]
  PARENT_WALLET_PRIVATE_KEY=5Kj7xYz9aB2c...
  ```
- Parent wallet needs SOL for transaction fees
- Get Devnet SOL: https://faucet.solana.com/
- Send to: `85aWtadfPvwsXSBwQH6GcuhuuHwXb3yWNK1Nd1pLgn15`

### "Transaction failed"
- Ensure Phantom is on **Devnet** (not Mainnet)
- Check parent wallet has enough SOL balance
- Verify network connection

---

## Alternative: Create New Parent Wallet

If you don't have the private key for `85aWtadfPvwsXSBwQH6GcuhuuHwXb3yWNK1Nd1pLgn15`, create a new one:

### Option A: Use Existing Wallet
1. Create new wallet in Phantom
2. Switch to Devnet
3. Get Devnet SOL from faucet
4. Export private key
5. Update both:
   - `backend/.env` → `PARENT_WALLET_PRIVATE_KEY`
   - `backend/src/config.ts` → `parentWalletAddress`

### Option B: Generate Programmatically

```bash
cd backend
npx ts-node -e "
const { Keypair } = require('@solana/web3.js');
const bs58 = require('bs58');

const keypair = Keypair.generate();
console.log('Address:', keypair.publicKey.toString());
console.log('Private Key:', bs58.encode(keypair.secretKey));
"
```

Then:
1. Copy the address and private key
2. Update `config.ts` with new address
3. Update `.env` with new private key
4. Send Devnet SOL to the new address
5. Restart backend

---

## Verify Setup

After configuring:

1. **Check backend starts without errors**
   ```bash
   npx ts-node src/index.ts
   # Should see: "Server running on port 3001"
   ```

2. **Test payout endpoint**
   - Complete a task as worker
   - Click "Request Payout"
   - Should see success message with transaction signature

3. **Verify on Solana Explorer**
   - Copy transaction signature
   - Visit: `https://explorer.solana.com/tx/[signature]?cluster=devnet`
   - Should show successful transfer

---

## Need Help?

1. Make sure parent wallet is on **Devnet**
2. Ensure wallet has some SOL for gas fees
3. Verify private key is correctly copied (no extra spaces)
4. Check backend console for detailed error messages

Once configured, payouts will work automatically! 🚀
