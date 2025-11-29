# CrowdCanvas - Decentralized Data Labeling Platform

A blockchain-based data labeling platform built on Solana. Users create tasks and pay in SOL, workers complete tasks and earn SOL.

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐
│  User Frontend  │         │ Worker Frontend │
│  (Port 3000)    │         │  (Port 3002)    │
└────────┬────────┘         └────────┬────────┘
         │                           │
         │        REST API           │
         └───────────┬───────────────┘
                     │
              ┌──────▼──────┐
              │   Backend   │
              │ (Port 3001) │
              └──────┬──────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
    ┌────▼────┐ ┌───▼────┐ ┌───▼────┐
    │ MongoDB │ │ Solana │ │  AWS   │
    │         │ │Mainnet │ │  S3    │
    └─────────┘ └────────┘ └────────┘
```

## 📋 Tech Stack

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Blockchain**: Solana Web3.js
- **Auth**: JWT + TweetNaCl (wallet signature verification)
- **Validation**: Zod

### Frontend (Both User & Worker)
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Wallet**: Solana Wallet Adapter
- **HTTP Client**: Axios

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (running locally or cloud instance)
3. **Solana Wallet** (Phantom, Solflare, etc.)
4. **SOL** (for creating tasks and payouts)

### Installation

#### 1. Clone & Install Dependencies

```bash
# Navigate to project
cd CrowdCanvas

# Install backend dependencies
cd backend
npm install

# Install user frontend dependencies
cd ../user-frontend
npm install

# Install worker frontend dependencies
cd ../worker-frontend
npm install
```

#### 2. Configure Backend

Create `.env` file in `backend/` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/crowdcanvas

# JWT Secrets (CHANGE THESE!)
JWT_SECRET=your-super-secret-jwt-key-here
WORKER_JWT_SECRET=your-worker-secret-jwt-key-here

# Solana Configuration
SOLANA_RPC_URL=https://api.devnet.solana.com
PARENT_WALLET_PRIVATE_KEY=your_parent_wallet_private_key_here

# AWS S3 (Optional - for image uploads)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=eu-north-1
AWS_BUCKET_NAME=

# Server
PORT=3001
NODE_ENV=development
```

#### 3. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env accordingly
```

#### 4. Run Applications

Open 3 separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:3001
```

**Terminal 2 - User Frontend:**
```bash
cd user-frontend
npm run dev
# Runs on http://localhost:3000
```

**Terminal 3 - Worker Frontend:**
```bash
cd worker-frontend
npm run dev
# Runs on http://localhost:3002
```

## 🔑 Required External Services & Configuration

### 1. Solana Wallet Private Key (REQUIRED for worker payouts)

**Where**: Backend `.env` → `PARENT_WALLET_PRIVATE_KEY`

**Why**: The parent wallet receives task payments and pays workers. Without this, **payouts will fail**.

**How to get**:

1. **Export from Phantom Wallet**:
   - Open Phantom wallet (address: `85aWtadfPvwsXSBwQH6GcuhuuHwXb3yWNK1Nd1pLgn15`)
   - Settings → Security & Privacy → Export Private Key
   - Enter password and copy the private key
   - Add to `.env`: `PARENT_WALLET_PRIVATE_KEY=your_key_here`

2. **Or Generate New Wallet**:
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
   - Update `backend/src/config.ts` → `parentWalletAddress` with new address
   - Add private key to `.env`
   - Fund wallet with Devnet SOL: https://faucet.solana.com/

**⚠️ SECURITY**: Never commit `.env` to git! Use this wallet ONLY for Devnet testing.

**📖 Detailed Guide**: See [PARENT-WALLET-SETUP.md](./PARENT-WALLET-SETUP.md)

### 2. MongoDB Connection (REQUIRED)
```bash
# Generate a new Solana keypair
solana-keygen new

# Export private key in base58 format
# Use your wallet's export feature or:
# For a keypair.json file, convert to base58
```

**Important**: 
- This wallet will pay out workers
- Must have sufficient SOL balance
- Keep the private key secret!

### 2. Solana RPC Endpoint (OPTIONAL - has default)

**Where**: Backend `.env` → `SOLANA_RPC_URL`

**Default**: `https://api.mainnet-beta.solana.com`

**Recommended Providers** (for better reliability):
- **QuickNode**: https://www.quicknode.com/
- **Alchemy**: https://www.alchemy.com/solana
- **Helius**: https://www.helius.dev/

**Example**:
```env
SOLANA_RPC_URL=https://your-endpoint.quiknode.pro/your-key/
```

### 3. MongoDB Database (REQUIRED)

**Where**: Backend `.env` → `MONGODB_URI`

**Option A - Local**:
```env
MONGODB_URI=mongodb://localhost:27017/crowdcanvas
```

**Option B - MongoDB Atlas (Cloud - Free tier available)**:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crowdcanvas
```

### 4. AWS S3 for Image Storage (OPTIONAL)

**Where**: Backend `.env` → AWS credentials

**Required for**: Image upload functionality in task creation

**How to get**:
1. Create AWS account: https://aws.amazon.com/
2. Create S3 bucket
3. Create IAM user with S3 permissions
4. Get Access Key ID and Secret Key

```env
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=eu-north-1
AWS_BUCKET_NAME=crowdcanvas-images
```

**Note**: Currently the app has placeholder for S3 upload. You can use direct image URLs for now.

## 📖 How It Works

### For Users (Task Creators)

1. **Connect Wallet**: Click "Connect Wallet" on user frontend
2. **Create Task**:
   - Enter task title (optional)
   - Add 2+ image URLs as options
   - Click "Pay 0.1 SOL" to send payment to platform wallet
   - Click "Create Task" to submit
3. **View Results**: Navigate to task page to see voting results

### For Workers (Task Completers)

1. **Connect Wallet**: Click "Connect Wallet" on worker frontend
2. **Complete Tasks**:
   - View current task
   - Click on the best option
   - Task auto-submits and shows next task
3. **Earn SOL**: Each task completion adds to balance
4. **Withdraw**: Click "Pay me out" to receive SOL in your wallet

## 🔐 Security Features

- **Wallet Signature Authentication**: No passwords, secure Web3 auth
- **JWT Tokens**: Separate secrets for users and workers
- **Transaction Verification**: All Solana transactions verified on-chain
- **Unique Submissions**: Workers can only submit once per task
- **Balance Locking**: Prevents double-spending during payouts
- **Input Validation**: Zod schemas validate all user input

## 📊 Database Schema

### Collections

**users**
- `_id`: ObjectId
- `address`: String (Solana wallet address, unique)
- `createdAt`: Date

**workers**
- `_id`: ObjectId
- `address`: String (Solana wallet address, unique)
- `pendingAmount`: Number (lamports)
- `lockedAmount`: Number (lamports)
- `createdAt`: Date

**tasks**
- `_id`: ObjectId
- `title`: String
- `userId`: ObjectId → users
- `signature`: String (Solana transaction signature, unique)
- `amount`: Number (100000000 lamports = 0.1 SOL)
- `done`: Boolean
- `options`: Array of {imageUrl: String}
- `createdAt`: Date

**submissions**
- `_id`: ObjectId
- `taskId`: ObjectId → tasks
- `workerId`: ObjectId → workers
- `optionId`: ObjectId
- `amount`: Number
- `createdAt`: Date
- Unique index: `{workerId, taskId}`

**payouts**
- `_id`: ObjectId
- `workerId`: ObjectId → workers
- `amount`: Number
- `signature`: String (transaction signature)
- `status`: Enum (Processing, Success, Failure)
- `createdAt`: Date

## 🔌 API Endpoints

### User Endpoints (`/v1/user`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signin` | No | Authenticate with wallet signature |
| POST | `/task` | Yes | Create new task |
| GET | `/task?taskId=<id>` | Yes | Get task results |
| GET | `/presignedUrl` | Yes | Get S3 upload URL (placeholder) |

### Worker Endpoints (`/v1/worker`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/signin` | No | Authenticate worker with wallet |
| GET | `/nextTask` | Yes | Get next available task |
| POST | `/submission` | Yes | Submit task completion |
| GET | `/balance` | Yes | Get worker balance |
| POST | `/payout` | Yes | Request SOL payout |

## 🎯 Configuration Summary

### ✅ Must Configure Before Running
1. **MongoDB URI** - Database connection
2. **JWT Secrets** - Change from defaults

### ⚠️ Must Configure for Full Functionality
3. **Solana Private Key** - For worker payouts
4. **Solana RPC URL** - Better performance (optional, has default)

### 🔧 Optional Enhancements
5. **AWS S3 Credentials** - For image upload feature

## 🛠️ Development Commands

```bash
# Backend
cd backend
npm run dev      # Development mode
npm run build    # Build TypeScript
npm start        # Production mode

# User Frontend
cd user-frontend
npm run dev      # Development mode
npm run build    # Build for production
npm start        # Production mode

# Worker Frontend
cd worker-frontend
npm run dev      # Development mode (port 3002)
npm run build    # Build for production
npm start        # Production mode (port 3002)
```

## 🚨 Troubleshooting

### MongoDB Connection Failed
```bash
# Check if MongoDB is running
mongod --version
# Start MongoDB
mongod
```

### Wallet Connection Issues
- Make sure you have a Solana wallet extension installed (Phantom recommended)
- Check browser console for errors
- Try disconnecting and reconnecting wallet

### Transaction Failed
- Ensure wallet has sufficient SOL
- Check Solana network status
- Verify RPC endpoint is working

### TypeScript Errors
```bash
# These are expected during development
# They will resolve after installing node_modules
npm install
```

## 📝 Important Notes

1. **Test on Devnet First**: Change `WalletAdapterNetwork.Mainnet` to `Devnet` for testing
2. **Task Amount**: Tasks cost 0.1 SOL (100,000,000 lamports)
3. **Worker Payment**: Each worker gets `task.amount / 100` per submission
4. **Total Submissions**: Tasks complete after 100 submissions
5. **Image URLs**: Use publicly accessible image URLs (https://...)

## 🔮 Future Enhancements

- [ ] S3 image upload implementation
- [ ] Task categories and filtering
- [ ] Worker reputation system
- [ ] Task preview before payment
- [ ] Escrow smart contract
- [ ] Multi-option tasks (not just images)
- [ ] Admin dashboard
- [ ] Analytics and reporting

## 📄 License

MIT

## 🤝 Contributing

This is a learning project. Feel free to fork and enhance!

---

**Built with ❤️ on Solana Blockchain**
