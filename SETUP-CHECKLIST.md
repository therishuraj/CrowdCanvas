# CrowdCanvas Setup Checklist

Complete these steps in order before starting the application.

---

## ✅ Step 1: Install Prerequisites

### 1.1 Install Node.js (if not installed)
- [ ] Check if Node.js is installed: `node --version`
- [ ] If not installed, download from: https://nodejs.org/ (v18 or higher)
- [ ] Verify installation: `node --version` and `npm --version`

### 1.2 Install MongoDB
- [ ] **Option A - Local MongoDB:**
  - Download from: https://www.mongodb.com/try/download/community
  - Install MongoDB Community Edition
  - Verify: `mongod --version`
  
- [ ] **Option B - MongoDB Atlas (Cloud - Recommended for beginners):**
  - Go to: https://www.mongodb.com/cloud/atlas
  - Click "Try Free"
  - Create account
  - Create free cluster (M0 Sandbox)
  - Wait for cluster to deploy (2-3 minutes)
  - Click "Connect" → "Drivers" → Copy connection string
  - Save connection string for Step 3

### 1.3 Install Solana Wallet Extension
- [ ] Install Phantom wallet: https://phantom.app/
- [ ] Or Solflare: https://solflare.com/
- [ ] Create new wallet or import existing
- [ ] **IMPORTANT**: Save your seed phrase securely!

---

## ✅ Step 2: Install Project Dependencies

### 2.1 Navigate to Project
```bash
cd /Users/I528997/Desktop/BITS/Project/Blockchain/CrowdCanvas
```

### 2.2 Install Backend Dependencies
```bash
cd backend
npm install
```
- [ ] Wait for installation to complete
- [ ] Check for any errors

### 2.3 Install User Frontend Dependencies
```bash
cd ../user-frontend
npm install
```
- [ ] Wait for installation to complete
- [ ] Check for any errors

### 2.4 Install Worker Frontend Dependencies
```bash
cd ../worker-frontend
npm install
```
- [ ] Wait for installation to complete
- [ ] Check for any errors

---

## ✅ Step 3: Configure Backend Environment

### 3.1 Create .env File
```bash
cd /Users/I528997/Desktop/BITS/Project/Blockchain/CrowdCanvas/backend
touch .env
```

### 3.2 Edit .env File
Open `backend/.env` in your editor and add:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/crowdcanvas

# JWT Secrets - CHANGE THESE!
JWT_SECRET=change-this-to-random-secret-key-123456
WORKER_JWT_SECRET=change-this-to-another-random-key-789012

# Solana Configuration
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
PARENT_WALLET_PRIVATE_KEY=

# AWS S3 (Leave empty for now - not required for basic functionality)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=eu-north-1
AWS_BUCKET_NAME=decentralized-fiver-s3 

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 3.3 Update Configuration Values

#### MongoDB URI:
- [ ] **If using Local MongoDB:**
  - Keep: `MONGODB_URI=mongodb://localhost:27017/crowdcanvas`

- [ ] **If using MongoDB Atlas:**
  - Replace with your connection string from Step 1.2
  - Example: `MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/crowdcanvas?retryWrites=true&w=majority`
  - Replace `<password>` with your actual password
  - Replace `test` with `crowdcanvas`

#### JWT Secrets:
- [ ] Change `JWT_SECRET` to a random string (at least 32 characters)
- [ ] Change `WORKER_JWT_SECRET` to a different random string
- [ ] **Tip**: Use password generator or type random characters

#### Solana Configuration (Optional for Testing):
- [ ] For now, leave `PARENT_WALLET_PRIVATE_KEY` empty
- [ ] You can test without worker payouts initially
- [ ] Keep default RPC URL: `https://api.mainnet-beta.solana.com`

---

## ✅ Step 4: Start MongoDB (If Using Local)

**Skip this if using MongoDB Atlas**

### 4.1 Start MongoDB Service
```bash
# Start MongoDB
mongod
```
- [ ] Keep this terminal window open (MongoDB runs here)
- [ ] You should see "Waiting for connections" message
- [ ] If port 27017 is in use, find and stop other MongoDB instances

### 4.2 Verify MongoDB is Running
Open a new terminal:
```bash
mongosh
show dbs
exit
```
- [ ] Should connect without errors

---

## ✅ Step 5: Test Backend Server

### 5.1 Open New Terminal for Backend
```bash
cd /Users/I528997/Desktop/BITS/Project/Blockchain/CrowdCanvas/backend
npm run dev
```

### 5.2 Verify Backend is Running
- [ ] Should see: "Server running on port 3001"
- [ ] Should see: "MongoDB connected successfully"
- [ ] No error messages

### 5.3 Test Health Check
Open browser and visit: http://localhost:3001/health
- [ ] Should see JSON: `{"status":"ok","timestamp":"..."}`

**Keep this terminal open!**

---

## ✅ Step 6: Test User Frontend

### 6.1 Open New Terminal for User Frontend
```bash
cd /Users/I528997/Desktop/BITS/Project/Blockchain/CrowdCanvas/user-frontend
npm run dev
```

### 6.2 Verify User Frontend is Running
- [ ] Should see: "Local: http://localhost:3000"
- [ ] No compilation errors

### 6.3 Open in Browser
Visit: http://localhost:3000
- [ ] Page loads successfully
- [ ] See "CrowdCanvas" header
- [ ] See "Connect Wallet" button
- [ ] Hero section displays

**Keep this terminal open!**

---

## ✅ Step 7: Test Worker Frontend

### 7.1 Open New Terminal for Worker Frontend
```bash
cd /Users/I528997/Desktop/BITS/Project/Blockchain/CrowdCanvas/worker-frontend
npm run dev
```

### 7.2 Verify Worker Frontend is Running
- [ ] Should see: "Local: http://localhost:3002"
- [ ] No compilation errors

### 7.3 Open in Browser
Visit: http://localhost:3002
- [ ] Page loads successfully
- [ ] See "CrowdCanvas Worker" header
- [ ] See "Connect Wallet" button

**Keep this terminal open!**

---

## ✅ Step 8: Test Wallet Connection

### 8.1 Test on User Frontend (http://localhost:3000)
- [ ] Click "Select Wallet" button
- [ ] Choose your wallet (Phantom/Solflare)
- [ ] Approve connection in wallet popup
- [ ] Click "Sign Message" to authenticate
- [ ] Sign the message in wallet popup
- [ ] Wallet address should appear in navbar

### 8.2 Test on Worker Frontend (http://localhost:3002)
- [ ] Click "Select Wallet" button
- [ ] Choose your wallet
- [ ] Approve connection
- [ ] Sign the worker authentication message
- [ ] Should see "Balance: 0.0000 SOL" in navbar

---

## ✅ Step 9: Get Test SOL (For Testing)

### 9.1 Switch to Devnet for Testing (Recommended)

**Important**: Before testing with real money, switch to Devnet!

#### Update User Frontend:
Edit `user-frontend/app/(root)/layout.tsx`:
- [ ] Change `WalletAdapterNetwork.Mainnet` to `WalletAdapterNetwork.Devnet`

#### Update Worker Frontend:
Edit `worker-frontend/app/(root)/layout.tsx`:
- [ ] Change `WalletAdapterNetwork.Mainnet` to `WalletAdapterNetwork.Devnet`

### 9.2 Get Devnet SOL
- [ ] Visit: https://solfaucet.com/
- [ ] Enter your wallet address
- [ ] Click "Devnet" and request airdrop
- [ ] Wait for 1-2 SOL to arrive (check wallet)

### 9.3 Update Backend for Devnet
Edit `backend/src/config.ts`:
- [ ] Change `SOLANA_RPC_URL` to: `https://api.devnet.solana.com`

Restart backend:
- [ ] Press Ctrl+C in backend terminal
- [ ] Run `npm run dev` again

---

## ✅ Step 10: Create Your First Task

### 10.1 Prepare Test Images
Find 2-3 image URLs (must be publicly accessible):
- [ ] Example: `https://picsum.photos/400/300?random=1`
- [ ] Example: `https://picsum.photos/400/300?random=2`

### 10.2 Create Task on User Frontend
- [ ] Go to http://localhost:3000
- [ ] Ensure wallet is connected
- [ ] Enter task title (optional): "Which image is better?"
- [ ] Paste first image URL in Option 1
- [ ] Paste second image URL in Option 2
- [ ] Click "Pay 0.1 SOL"
- [ ] Approve transaction in wallet
- [ ] Wait for confirmation
- [ ] Click "Create Task"
- [ ] Should redirect to task results page

---

## ✅ Step 11: Complete a Task as Worker

### 11.1 View Task on Worker Frontend
- [ ] Go to http://localhost:3002
- [ ] Ensure wallet is connected (use different wallet if testing alone)
- [ ] Should see the task you created
- [ ] Images should be visible

### 11.2 Submit Task
- [ ] Click on one of the images
- [ ] Task should submit automatically
- [ ] Should see next task or "No tasks available"
- [ ] Check balance - should have increased

---

## ✅ Step 12: Advanced Setup (Optional)

### 12.1 Configure Worker Payouts

**Only do this when ready to enable real payouts**

#### Generate Solana Keypair:
```bash
# Install Solana CLI if not installed
# Visit: https://docs.solana.com/cli/install-solana-cli-tools

# Generate new keypair
solana-keygen new --outfile ~/crowdcanvas-wallet.json

# Get base58 private key
# Use a tool or script to convert keypair.json to base58
```

#### Update Backend .env:
- [ ] Add private key to `PARENT_WALLET_PRIVATE_KEY`
- [ ] Ensure this wallet has SOL for payouts
- [ ] Restart backend

### 12.2 Configure Better RPC (Optional)

For production or heavy usage:

- [ ] Sign up for QuickNode: https://www.quicknode.com/
- [ ] Or Alchemy: https://www.alchemy.com/solana
- [ ] Create Solana endpoint
- [ ] Copy RPC URL
- [ ] Update `SOLANA_RPC_URL` in backend `.env`
- [ ] Restart backend

### 12.3 Configure AWS S3 (Optional)

For image upload functionality:

- [ ] Create AWS account
- [ ] Create S3 bucket
- [ ] Create IAM user with S3 permissions
- [ ] Get Access Key and Secret Key
- [ ] Update AWS variables in backend `.env`
- [ ] Restart backend

---

## 🎉 Setup Complete!

You now have a fully functional CrowdCanvas platform!

### Running Summary:

**You should have 3 terminals open:**
1. **Backend**: `cd backend && npm run dev` (Port 3001)
2. **User Frontend**: `cd user-frontend && npm run dev` (Port 3000)
3. **Worker Frontend**: `cd worker-frontend && npm run dev` (Port 3002)

**Plus (if using local MongoDB):**
4. **MongoDB**: `mongod`

### Access Points:
- **User App**: http://localhost:3000
- **Worker App**: http://localhost:3002
- **API Health**: http://localhost:3001/health

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Kill existing MongoDB
killall mongod

# Start again
mongod
```

### Port Already in Use
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9

# For port 3000
lsof -ti:3000 | xargs kill -9

# For port 3002
lsof -ti:3002 | xargs kill -9
```

### Wallet Not Connecting
- Clear browser cache
- Disable other wallet extensions
- Try incognito mode
- Check browser console for errors

### TypeScript Errors
- These are normal during development
- Run `npm install` in affected directory
- Restart dev server

---

## 📝 Next Steps After Setup

1. **Test the full flow**: Create task → Complete as worker → Request payout
2. **Explore the code**: Understand how it works
3. **Customize**: Change colors, add features
4. **Deploy**: Consider deploying to production (Vercel for frontends, Railway for backend)

---

**Good luck! 🚀**
