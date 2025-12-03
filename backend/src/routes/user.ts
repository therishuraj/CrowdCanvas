import { Router } from 'express';
import jwt from 'jsonwebtoken';
import nacl from 'tweetnacl';
import { PublicKey, Connection, Transaction, SystemProgram } from '@solana/web3.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { z } from 'zod';
import { User, Task, Submission } from '../models';
import { authMiddleware, AuthRequest } from '../middleware';
import { config } from '../config';

const router = Router();
const connection = new Connection(config.solanaRpcUrl);

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

// Signin
router.post('/signin', async (req, res) => {
  try {
    const { publicKey, signature } = req.body;
    console.log('👤 User signin attempt:', publicKey);

    const message = new TextEncoder().encode('Sign into CrowdCanvas');
    const result = nacl.sign.detached.verify(
      message,
      new Uint8Array(signature.data),
      new PublicKey(publicKey).toBytes()
    );

    if (!result) {
      console.log('❌ Invalid signature for user:', publicKey);
      return res.status(401).json({ error: 'Invalid signature' });
    }

    let user = await User.findOne({ address: publicKey });
    if (!user) {
      console.log('✨ Creating new user:', publicKey);
      user = await User.create({ address: publicKey });
    } else {
      console.log('✅ Existing user logged in:', publicKey);
    }

    const token = jwt.sign({ userId: user._id.toString() }, config.jwtSecret);
    console.log('🎫 Token generated for user:', user._id);
    res.json({ token });
  } catch (error) {
    console.error('❌ User signin error:', error);
    res.status(500).json({ error: 'Signin failed' });
  }
});

// Create Task
const createTaskSchema = z.object({
  title: z.string().optional(),
  signature: z.string(),
  totalSol: z.number().positive().optional(),
  votesRequired: z.number().int().positive().optional(),
  options: z.array(z.object({
    imageUrl: z.string()
  })).min(2, 'Minimum 2 options required'),
  platformFee: z.number().optional(),
  gasFee: z.number().optional(),
  totalAmount: z.number().optional()
});

router.post('/task', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const body = createTaskSchema.parse(req.body);

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📝 TASK CREATION REQUEST');
    console.log('═══════════════════════════════════════════════════════');
    console.log('User ID:', req.userId);
    console.log('Task Title:', body.title);
    console.log('Transaction Signature:', body.signature);
    console.log('Network:', config.solanaRpcUrl);
    console.log('Expected Parent Wallet:', config.parentWalletAddress);
    console.log('Expected Amount:', config.taskAmount, 'lamports (', config.taskAmount / 1000000000, 'SOL)');
    console.log('───────────────────────────────────────────────────────');

    // Wait a bit for transaction to be confirmed
    console.log('⏳ Waiting 2 seconds for transaction confirmation...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Verify transaction
    let transaction;
    try {
      console.log('🔍 Fetching transaction from blockchain...');
      transaction = await connection.getTransaction(body.signature, {
        maxSupportedTransactionVersion: 1
      });
    } catch (txError: any) {
      console.error('❌ Error fetching transaction:', txError.message);
      console.log('═══════════════════════════════════════════════════════\n');
      return res.status(400).json({ 
        error: 'Failed to fetch transaction',
        message: txError.message,
        signature: body.signature
      });
    }

    if (!transaction) {
      console.log('❌ TRANSACTION NOT FOUND');
      console.log('Signature:', body.signature);
      console.log('Network:', config.solanaRpcUrl);
      console.log('Hint: Make sure Phantom wallet is on Devnet!');
      console.log('═══════════════════════════════════════════════════════\n');
      return res.status(400).json({ 
        error: 'Transaction not found',
        message: 'Make sure you are on Devnet and the transaction is confirmed',
        signature: body.signature,
        network: config.solanaRpcUrl,
        hint: 'Check that Phantom wallet is set to Devnet, not Mainnet'
      });
    }

    console.log('✅ Transaction found on blockchain!');
    console.log('\n🔍 TRANSACTION DETAILS:');
    console.log('───────────────────────────────────────────────────────');
    
    // Get all account keys
    const accountKeys = transaction.transaction.message.getAccountKeys();
    console.log('Total accounts involved:', accountKeys.length);
    
    // Sender (index 0)
    const senderAddress = accountKeys.get(0)?.toString();
    console.log('\n👤 SENDER (Account 0):');
    console.log('  Address:', senderAddress);
    
    // Recipient (index 1)
    const recipientAddress = accountKeys.get(1)?.toString();
    console.log('\n🎯 RECIPIENT (Account 1):');
    console.log('  Address:', recipientAddress);
    console.log('  Expected:', config.parentWalletAddress);
    console.log('  Match:', recipientAddress === config.parentWalletAddress ? '✅ YES' : '❌ NO');
    
    // System Program (index 2)
    if (accountKeys.length > 2) {
      console.log('\n⚙️  SYSTEM PROGRAM (Account 2):');
      console.log('  Address:', accountKeys.get(2)?.toString());
    }
    
    // Balance changes
    console.log('\n💰 BALANCE CHANGES:');
    const senderBalanceChange = (transaction.meta?.postBalances[0]! - transaction.meta?.preBalances[0]!);
    const recipientBalanceChange = (transaction.meta?.postBalances[1]! - transaction.meta?.preBalances[1]!);
    
    console.log('  Sender (', senderAddress, '):');
    console.log('    Before:', transaction.meta?.preBalances[0], 'lamports');
    console.log('    After:', transaction.meta?.postBalances[0], 'lamports');
    console.log('    Change:', senderBalanceChange, 'lamports (', senderBalanceChange / 1000000000, 'SOL)');
    
    console.log('\n  Recipient (', recipientAddress, '):');
    console.log('    Before:', transaction.meta?.preBalances[1], 'lamports');
    console.log('    After:', transaction.meta?.postBalances[1], 'lamports');
    console.log('    Change:', recipientBalanceChange, 'lamports (', recipientBalanceChange / 1000000000, 'SOL)');
    console.log('    Expected:', config.taskAmount, 'lamports (', config.taskAmount / 1000000000, 'SOL)');
    console.log('    Match:', recipientBalanceChange === config.taskAmount ? '✅ YES' : '❌ NO');
    
    console.log('───────────────────────────────────────────────────────');
    
    // Verify recipient is parent wallet
    if (recipientAddress !== config.parentWalletAddress) {
      console.log('\n❌ RECIPIENT MISMATCH!');
      console.log('Expected parent wallet:', config.parentWalletAddress);
      console.log('Actual recipient:', recipientAddress);
      console.log('═══════════════════════════════════════════════════════\n');
      return res.status(400).json({ 
        error: 'Transaction recipient mismatch',
        expected: config.parentWalletAddress,
        received: recipientAddress,
        hint: 'Payment went to wrong address. Check the frontend code.'
      });
    }

    // Validate transaction amount (includes worker payment + platform fee)
    const workerPaymentLamports = Math.floor((body.totalSol || 0.1) * 1000000000);
    const platformFeeLamports = Math.floor((body.platformFee || 0) * 1000000000);
    const expectedAmount = workerPaymentLamports + platformFeeLamports;
    
    if (recipientBalanceChange !== expectedAmount) {
      console.log('\n❌ AMOUNT MISMATCH!');
      console.log('Worker payment:', workerPaymentLamports, 'lamports');
      console.log('Platform fee:', platformFeeLamports, 'lamports');
      console.log('Expected total:', expectedAmount, 'lamports');
      console.log('Actual amount:', recipientBalanceChange, 'lamports');
      console.log('═══════════════════════════════════════════════════════\n');
      return res.status(400).json({ 
        error: 'Incorrect transaction amount',
        workerPayment: workerPaymentLamports,
        platformFee: platformFeeLamports,
        expected: expectedAmount,
        received: recipientBalanceChange
      });
    }

    // Calculate amount per worker (ONLY from worker payment, NOT platform fees)
    const votesRequired = body.votesRequired || 10;
    const amountPerWorker = Math.floor(workerPaymentLamports / votesRequired);

    // Create task
    console.log('\n✅ ALL VALIDATIONS PASSED');
    console.log('Creating task in database...');
    console.log('💰 PAYMENT BREAKDOWN:');
    console.log('  Total received:', expectedAmount, 'lamports (', expectedAmount / 1000000000, 'SOL)');
    console.log('  └─ Worker payment:', workerPaymentLamports, 'lamports (', workerPaymentLamports / 1000000000, 'SOL)');
    console.log('  └─ Platform fees:', platformFeeLamports, 'lamports (', platformFeeLamports / 1000000000, 'SOL)');
    console.log('📊 DISTRIBUTION:');
    console.log('  Votes required:', votesRequired);
    console.log('  Amount per worker:', amountPerWorker, 'lamports (', amountPerWorker / 1000000000, 'SOL)');
    console.log('  └─ Instant (50%):', Math.floor(amountPerWorker / 2), 'lamports');
    console.log('  └─ Bonus (50%):', amountPerWorker - Math.floor(amountPerWorker / 2), 'lamports');
    const task = await Task.create({
      title: body.title || 'Select the most clickable thumbnail',
      userId: req.userId,
      signature: body.signature,
      amount: amountPerWorker,
      totalAmount: workerPaymentLamports, // Only worker payment, not platform fees
      votesRequired: votesRequired,
      votesReceived: 0,
      options: body.options
    });

    console.log('✅ Task created successfully!');
    console.log('Task ID:', task._id);
    console.log('Task Title:', task.title);
    console.log('Options:', task.options.length);
    console.log('Total Amount:', task.amount, 'lamports');
    console.log('Per Submission:', Math.floor(task.amount / config.totalSubmissions), 'lamports');
    console.log('Total Submissions Needed:', config.totalSubmissions);
    console.log('═══════════════════════════════════════════════════════\n');
    
    res.json({ taskId: task._id.toString() });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('❌ Validation error:', error.errors);
      console.log('═══════════════════════════════════════════════════════\n');
      return res.status(400).json({ error: error.errors });
    }
    console.error('❌ Task creation error:', error);
    console.log('═══════════════════════════════════════════════════════\n');
    res.status(500).json({ error: 'Task creation failed', message: (error as Error).message });
  }
});

// Get Task Results or All Tasks
router.get('/task', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const taskId = req.query.taskId as string;
    
    // If no taskId provided, return all user's tasks
    if (!taskId) {
      const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
      return res.json({ 
        tasks: tasks.map(task => ({
          _id: task._id,
          title: task.title,
          amount: task.amount,
          done: task.done,
          createdAt: task.createdAt
        }))
      });
    }
    
    // Return specific task with results
    const task = await Task.findOne({ _id: taskId, userId: req.userId });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const submissions = await Submission.find({ taskId });

    // Count submissions per option
    const result: Record<string, { count: number; option: { imageUrl: string } }> = {};
    task.options.forEach((option: any) => {
      result[option._id.toString()] = {
        count: 0,
        option: { imageUrl: option.imageUrl }
      };
    });

    submissions.forEach((submission: any) => {
      const optionId = submission.optionId.toString();
      if (result[optionId]) {
        result[optionId].count++;
      }
    });

    res.json({
      result,
      taskDetails: {
        id: task._id.toString(),
        title: task.title,
        options: task.options
      }
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Upload image to S3
router.post('/upload', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_REGION || 'eu-north-1';
    
    if (!bucketName || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      return res.status(500).json({ 
        error: 'S3 not configured',
        message: 'AWS credentials are missing in environment variables'
      });
    }

    const { image } = req.body; // base64 encoded image
    
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Convert base64 to buffer
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate unique filename
    const fileName = `task-images/${req.userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: 'image/jpeg'
    });

    await s3Client.send(command);
    
    // Public URL to access the uploaded file via CloudFront
    const publicUrl = `https://d3uiymoagcqxzj.cloudfront.net/${fileName}`;

    console.log('✅ Uploaded image to S3:', fileName);
    console.log('🌐 CloudFront URL:', publicUrl);
    
    res.json({ url: publicUrl });
  } catch (error) {
    console.error('❌ Failed to upload image:', error);
    res.status(500).json({ error: 'Failed to upload image', details: (error as Error).message });
  }
});

// Get Presigned URL for S3 upload
router.get('/presignedUrl', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_REGION || 'eu-north-1';
    
    console.log('📸 S3 Configuration Check:');
    console.log('Bucket:', bucketName);
    console.log('Region:', region);
    console.log('Access Key:', process.env.AWS_ACCESS_KEY_ID ? 'Set' : 'Missing');
    console.log('Secret Key:', process.env.AWS_SECRET_ACCESS_KEY ? 'Set' : 'Missing');
    
    if (!bucketName || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      return res.status(500).json({ 
        error: 'S3 not configured',
        message: 'AWS credentials are missing in environment variables'
      });
    }

    // Generate unique filename
    const fileName = `task-images/${req.userId}/${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
    
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ContentType: 'image/jpeg'
    });

    // Generate presigned URL valid for 5 minutes
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    
    // Public URL to access the uploaded file
    const publicUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

    console.log('✅ Generated presigned URL for:', fileName);
    console.log('Presigned URL length:', presignedUrl.length);
    console.log('Public URL:', publicUrl);
    
    res.json({
      presignedUrl,
      url: publicUrl
    });
  } catch (error) {
    console.error('❌ Failed to generate presigned URL:', error);
    res.status(500).json({ error: 'Failed to generate presigned URL', details: (error as Error).message });
  }
});

// Get Task Insights
router.get('/task/insights/:taskId', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { taskId } = req.params;
    
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if user owns this task
    if (task.userId?.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to view this task' });
    }

    // Get all submissions for this task
    const submissions = await Submission.find({ taskId });

    // Count votes per option
    const voteCounts: { [key: string]: number } = {};
    task.options.forEach((option: any) => {
      voteCounts[option._id.toString()] = 0;
    });

    submissions.forEach(sub => {
      const optionId = sub.optionId.toString();
      voteCounts[optionId] = (voteCounts[optionId] || 0) + 1;
    });

    // Find winner
    let winningOptionId = '';
    let maxVotes = 0;
    Object.entries(voteCounts).forEach(([optionId, votes]) => {
      if (votes > maxVotes) {
        maxVotes = votes;
        winningOptionId = optionId;
      }
    });

    // Prepare voting data
    const votingData = task.options.map((option: any) => {
      const votes = voteCounts[option._id.toString()] || 0;
      const percentage = task.votesReceived > 0 ? (votes / task.votesReceived) * 100 : 0;
      
      return {
        option: `Option ${task.options.indexOf(option) + 1}`,
        votes,
        percentage
      };
    });

    const winner = task.done && winningOptionId 
      ? `Option ${task.options.findIndex((o: any) => o._id.toString() === winningOptionId) + 1}`
      : undefined;

    res.json({
      taskId: task._id,
      title: task.title,
      votingData,
      status: {
        completed: task.done,
        progress: Math.round((task.votesReceived / task.votesRequired) * 100),
        votesReceived: task.votesReceived,
        votesRequired: task.votesRequired
      },
      winner
    });
  } catch (error) {
    console.error('Error fetching task insights:', error);
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

export default router;
