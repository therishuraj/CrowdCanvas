import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import { config } from './config';
import userRouter from './routes/user';
import workerRouter from './routes/worker';

console.log('🚀 Starting CrowdCanvas Backend...');
console.log('📝 Configuration:');
console.log('  - Port:', config.port);
console.log('  - Environment:', config.nodeEnv);
console.log('  - Solana RPC:', config.solanaRpcUrl);
console.log('  - Parent Wallet:', config.parentWalletAddress);
console.log('  - Task Amount:', config.taskAmount, 'lamports');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/v1/user', userRouter);
app.use('/v1/worker', workerRouter);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB connected successfully');
    
    app.listen(config.port, () => {
      console.log(`✅ Server running on port ${config.port}`);
      console.log(`🌐 API available at http://localhost:${config.port}`);
      console.log('📡 Ready to accept requests\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
