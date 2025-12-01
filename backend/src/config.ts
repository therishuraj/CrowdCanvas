import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // MongoDB
  mongodbUri: process.env.MONGODB_URI || 'mongodb+srv://nexus:password@cluster0.kei0rsa.mongodb.net/crowdcanvas?retryWrites=true&w=majority&appName=Cluster0',
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'rishu',
  workerJwtSecret: process.env.WORKER_JWT_SECRET || 'raj',
  
  // Solana
  solanaRpcUrl: process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
  parentWalletPrivateKey: process.env.PARENT_WALLET_PRIVATE_KEY || '',
  
  // AWS S3
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  awsRegion: process.env.AWS_REGION || 'eu-north-1',
  awsBucketName: process.env.AWS_BUCKET_NAME || '',
  
  // Server
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Business Logic
  totalDecimals: 1000000000, // 1 SOL = 1,000,000,000 lamports
  taskAmount: 100000000, // 0.1 SOL in lamports
  totalSubmissions: 100,
  parentWalletAddress: '5SNxuX1yH4HC3STo7uh1hzdAYix54x5nCvhENfTBbLme'
};
