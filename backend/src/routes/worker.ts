import { Router } from 'express';
import jwt from 'jsonwebtoken';
import nacl from 'tweetnacl';
import { PublicKey, Connection, Keypair, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';
import bs58 from 'bs58';
import { Worker, Task, Submission, Payout, PayoutStatus } from '../models';
import { workerAuthMiddleware, AuthRequest } from '../middleware';
import { config } from '../config';

const router = Router();
const connection = new Connection(config.solanaRpcUrl);

// Signin
router.post('/signin', async (req, res) => {
  try {
    const { publicKey, signature } = req.body;
    console.log('👷 Worker signin attempt:', publicKey);

    const message = new TextEncoder().encode('Sign into CrowdCanvas as a worker');
    const result = nacl.sign.detached.verify(
      message,
      new Uint8Array(signature.data),
      new PublicKey(publicKey).toBytes()
    );

    if (!result) {
      console.log('❌ Invalid signature for worker:', publicKey);
      return res.status(401).json({ error: 'Invalid signature' });
    }

    let worker = await Worker.findOne({ address: publicKey });
    if (!worker) {
      console.log('✨ Creating new worker:', publicKey);
      worker = await Worker.create({ address: publicKey });
    } else {
      console.log('✅ Existing worker logged in:', publicKey);
    }

    const token = jwt.sign({ userId: worker._id.toString() }, config.workerJwtSecret);
    const amount = worker.pendingAmount / config.totalDecimals;
    console.log('🎫 Token generated for worker:', worker._id, '| Balance:', amount, 'SOL');

    res.json({ token, amount });
  } catch (error) {
    console.error('❌ Worker signin error:', error);
    res.status(500).json({ error: 'Signin failed' });
  }
});

// Get Next Task
router.get('/nextTask', workerAuthMiddleware, async (req: AuthRequest, res) => {
  try {
    const workerId = req.userId;
    console.log('🔍 Fetching available tasks for worker:', workerId);

    // Find tasks that are not done and worker hasn't submitted
    const submittedTaskIds = await Submission.find({ workerId }).distinct('taskId');
    console.log('📝 Worker has submitted to', submittedTaskIds.length, 'tasks');

    const tasks = await Task.find({
      done: false,
      _id: { $nin: submittedTaskIds }
    }).sort({ createdAt: 1 });

    if (tasks.length === 0) {
      console.log('⚠️ No more tasks available for worker:', workerId);
      return res.json({ message: 'No more tasks available', tasks: [] });
    }

    console.log('✅ Found', tasks.length, 'available tasks');
    res.json({
      tasks: tasks.map(task => ({
        id: task._id.toString(),
        title: task.title,
        amount: task.amount / config.totalSubmissions,
        options: task.options.map((option: any) => ({
          id: option._id.toString(),
          imageUrl: option.imageUrl
        }))
      }))
    });
  } catch (error) {
    console.error('❌ Error fetching next task:', error);
    res.status(500).json({ error: 'Failed to fetch next task' });
  }
});

// Submit Task
router.post('/submission', workerAuthMiddleware, async (req: AuthRequest, res) => {
  try {
    const { taskId, selection } = req.body;
    const workerId = req.userId;
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📤 WORKER SUBMISSION');
    console.log('═══════════════════════════════════════════════════════');
    console.log('Worker ID:', workerId);
    console.log('Task ID:', taskId);
    console.log('Selected Option:', selection);
    console.log('───────────────────────────────────────────────────────');

    // Verify this is the worker's next task
    const submittedTaskIds = await Submission.find({ workerId }).distinct('taskId');
    console.log('Worker has already submitted to', submittedTaskIds.length, 'tasks');
    
    const nextTask = await Task.findOne({
      done: false,
      _id: { $nin: submittedTaskIds }
    }).sort({ createdAt: 1 });

    if (!nextTask || nextTask._id.toString() !== taskId) {
      console.log('❌ INVALID TASK SUBMISSION');
      console.log('Expected next task:', nextTask?._id);
      console.log('Received task:', taskId);
      console.log('═══════════════════════════════════════════════════════\n');
      return res.status(400).json({ error: 'Invalid task submission' });
    }

    console.log('✅ Task validation passed');
    console.log('Task:', nextTask.title);
    console.log('Total task amount:', nextTask.amount, 'lamports');

    // Validate option exists
    const optionExists = nextTask.options.some((opt: any) => opt._id.toString() === selection);
    if (!optionExists) {
      console.log('❌ INVALID OPTION');
      console.log('Selected:', selection);
      console.log('Available options:', nextTask.options.map((o: any) => o._id.toString()));
      console.log('═══════════════════════════════════════════════════════\n');
      return res.status(400).json({ error: 'Invalid option selected' });
    }

    const amount = Math.floor(nextTask.amount / config.totalSubmissions);
    console.log('\n💰 PAYMENT CALCULATION:');
    console.log('Task amount:', nextTask.amount, 'lamports');
    console.log('Total submissions:', config.totalSubmissions);
    console.log('Amount per submission:', amount, 'lamports (', amount / 1000000000, 'SOL)');
    console.log('───────────────────────────────────────────────────────');

    // Create submission
    const submission = await Submission.create({
      workerId,
      taskId,
      optionId: selection,
      amount
    });
    console.log('✅ Submission saved:', submission._id);

    // Update worker's pending amount
    const workerBefore = await Worker.findById(workerId);
    await Worker.findByIdAndUpdate(workerId, {
      $inc: { pendingAmount: amount }
    });
    const workerAfter = await Worker.findById(workerId);
    
    console.log('\n💵 WORKER BALANCE UPDATE:');
    console.log('Before:', workerBefore!.pendingAmount, 'lamports (', workerBefore!.pendingAmount / 1000000000, 'SOL)');
    console.log('After:', workerAfter!.pendingAmount, 'lamports (', workerAfter!.pendingAmount / 1000000000, 'SOL)');
    console.log('Increase:', amount, 'lamports');
    console.log('───────────────────────────────────────────────────────');

    // Check if task is complete
    const submissionCount = await Submission.countDocuments({ taskId });
    console.log('\n📊 TASK PROGRESS:');
    console.log('Submissions:', submissionCount, '/', config.totalSubmissions);
    
    if (submissionCount >= config.totalSubmissions) {
      await Task.findByIdAndUpdate(taskId, { done: true });
      console.log('🎉 TASK COMPLETED! Marking as done.');
    } else {
      console.log('Task still needs', config.totalSubmissions - submissionCount, 'more submissions');
    }
    console.log('═══════════════════════════════════════════════════════\n');

    // Get next task
    const updatedSubmittedTaskIds = await Submission.find({ workerId }).distinct('taskId');
    const nextAvailableTask = await Task.findOne({
      done: false,
      _id: { $nin: updatedSubmittedTaskIds }
    }).sort({ createdAt: 1 });

    const worker = await Worker.findById(workerId);

    res.json({
      nextTask: nextAvailableTask ? {
        id: nextAvailableTask._id.toString(),
        title: nextAvailableTask.title,
        amount: nextAvailableTask.amount / config.totalSubmissions,
        options: nextAvailableTask.options.map((option: any) => ({
          id: option._id.toString(),
          imageUrl: option.imageUrl
        }))
      } : null,
      amount: worker!.pendingAmount / config.totalDecimals
    });
  } catch (error) {
    console.error('❌ Submission error:', error);
    console.log('═══════════════════════════════════════════════════════\n');
    res.status(500).json({ error: 'Submission failed' });
  }
});

// Get Balance
router.get('/balance', workerAuthMiddleware, async (req: AuthRequest, res) => {
  try {
    const worker = await Worker.findById(req.userId);
    if (!worker) {
      console.log('❌ Worker not found:', req.userId);
      return res.status(404).json({ error: 'Worker not found' });
    }

    const pending = worker.pendingAmount / config.totalDecimals;
    const locked = worker.lockedAmount / config.totalDecimals;
    console.log('💰 Balance check | Worker:', req.userId, '| Pending:', pending, 'SOL | Locked:', locked, 'SOL');

    res.json({
      pendingAmount: pending,
      lockedAmount: locked
    });
  } catch (error) {
    console.error('❌ Error fetching balance:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

// Request Payout
router.post('/payout', workerAuthMiddleware, async (req: AuthRequest, res) => {
  try {
    const worker = await Worker.findById(req.userId);
    if (!worker) {
      console.log('❌ Worker not found for payout:', req.userId);
      return res.status(404).json({ error: 'Worker not found' });
    }

    console.log('\n═══════════════════════════════════════════════════════');
    console.log('💸 PAYOUT REQUEST');
    console.log('═══════════════════════════════════════════════════════');
    console.log('Worker ID:', req.userId);
    console.log('Worker Address:', worker.address);
    console.log('Pending Amount:', worker.pendingAmount, 'lamports (', worker.pendingAmount / 1000000000, 'SOL)');
    console.log('Locked Amount:', worker.lockedAmount, 'lamports (', worker.lockedAmount / 1000000000, 'SOL)');
    console.log('───────────────────────────────────────────────────────');

    if (worker.pendingAmount === 0) {
      console.log('⚠️ NO PENDING AMOUNT');
      console.log('═══════════════════════════════════════════════════════\n');
      return res.status(400).json({ error: 'No pending amount to payout' });
    }

    // Check if parent wallet private key is configured
    if (!config.parentWalletPrivateKey) {
      console.log('❌ PARENT WALLET PRIVATE KEY NOT CONFIGURED');
      console.log('═══════════════════════════════════════════════════════\n');
      return res.status(500).json({ 
        error: 'Server configuration error: Parent wallet private key not set',
        message: 'Please add PARENT_WALLET_PRIVATE_KEY to backend/.env file'
      });
    }

    // Lock the amount to prevent double spending
    const amountToTransfer = worker.pendingAmount;
    console.log('\n🔒 LOCKING AMOUNT');
    console.log('Amount to transfer:', amountToTransfer, 'lamports (', amountToTransfer / 1000000000, 'SOL)');
    
    await Worker.findByIdAndUpdate(req.userId, {
      pendingAmount: 0,
      $inc: { lockedAmount: amountToTransfer }
    });
    
    const lockedWorker = await Worker.findById(req.userId);
    console.log('After locking:');
    console.log('  Pending:', lockedWorker!.pendingAmount, 'lamports');
    console.log('  Locked:', lockedWorker!.lockedAmount, 'lamports');
    console.log('───────────────────────────────────────────────────────');

    // Create Solana transaction
    try {
      console.log('\n🔑 LOADING PARENT WALLET');
      let privateKeyArray: Uint8Array;
      
      // Handle both base58 and array format private keys
      if (config.parentWalletPrivateKey.startsWith('[')) {
        console.log('Format: Array');
        privateKeyArray = Uint8Array.from(JSON.parse(config.parentWalletPrivateKey));
      } else {
        console.log('Format: Base58');
        privateKeyArray = bs58.decode(config.parentWalletPrivateKey);
      }
      
      console.log('Private key length:', privateKeyArray.length, 'bytes');
      
      // Verify key size (should be 64 bytes)
      if (privateKeyArray.length !== 64) {
        console.log('❌ INVALID PRIVATE KEY SIZE:', privateKeyArray.length, 'bytes (expected 64)');
        throw new Error(`Invalid private key size: ${privateKeyArray.length} bytes (expected 64)`);
      }
      
      const parentWallet = Keypair.fromSecretKey(privateKeyArray);
      console.log('✅ Parent wallet loaded successfully');
      console.log('Parent wallet address:', parentWallet.publicKey.toString());
      console.log('Config parent address:', config.parentWalletAddress);
      console.log('Match:', parentWallet.publicKey.toString() === config.parentWalletAddress ? '✅ YES' : '⚠️ NO');
      console.log('───────────────────────────────────────────────────────');

      // Check parent wallet balance
      console.log('\n💰 CHECKING PARENT WALLET BALANCE');
      const parentBalance = await connection.getBalance(parentWallet.publicKey);
      console.log('Parent wallet balance:', parentBalance, 'lamports (', parentBalance / 1000000000, 'SOL)');
      console.log('Amount to send:', amountToTransfer, 'lamports (', amountToTransfer / 1000000000, 'SOL)');
      console.log('Estimated fee: ~5000 lamports');
      console.log('Total needed:', amountToTransfer + 5000, 'lamports');
      console.log('Sufficient balance:', parentBalance >= (amountToTransfer + 5000) ? '✅ YES' : '❌ NO');
      
      if (parentBalance < (amountToTransfer + 5000)) {
        console.log('\n❌ INSUFFICIENT BALANCE IN PARENT WALLET');
        console.log('Need:', (amountToTransfer + 5000) / 1000000000, 'SOL');
        console.log('Have:', parentBalance / 1000000000, 'SOL');
        console.log('═══════════════════════════════════════════════════════\n');
        throw new Error('Insufficient balance in parent wallet');
      }
      console.log('───────────────────────────────────────────────────────');

      console.log('\n📝 CREATING TRANSACTION');
      console.log('FROM:', parentWallet.publicKey.toString());
      console.log('TO:', worker.address);
      console.log('AMOUNT:', amountToTransfer, 'lamports (', amountToTransfer / 1000000000, 'SOL)');
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: parentWallet.publicKey,
          toPubkey: new PublicKey(worker.address),
          lamports: amountToTransfer
        })
      );
      console.log('✅ Transaction created');
      console.log('───────────────────────────────────────────────────────');

      console.log('\n📡 SENDING TRANSACTION TO BLOCKCHAIN');
      console.log('Network:', config.solanaRpcUrl);
      const signature = await sendAndConfirmTransaction(connection, transaction, [parentWallet]);
      console.log('✅ TRANSACTION CONFIRMED!');
      console.log('Signature:', signature);
      console.log('Explorer:', `https://explorer.solana.com/tx/${signature}?cluster=devnet`);
      console.log('───────────────────────────────────────────────────────');

      // Update worker balance
      console.log('\n💾 UPDATING DATABASE');
      await Worker.findByIdAndUpdate(req.userId, {
        $inc: { lockedAmount: -amountToTransfer }
      });
      const finalWorker = await Worker.findById(req.userId);
      console.log('Final worker state:');
      console.log('  Pending:', finalWorker!.pendingAmount, 'lamports');
      console.log('  Locked:', finalWorker!.lockedAmount, 'lamports');

      // Record payout
      const payout = await Payout.create({
        workerId: req.userId,
        amount: amountToTransfer,
        signature,
        status: PayoutStatus.Success
      });
      console.log('✅ Payout record saved:', payout._id);

      const solAmount = amountToTransfer / config.totalDecimals;
      console.log('\n🎉 PAYOUT SUCCESSFUL!');
      console.log('Amount:', solAmount, 'SOL');
      console.log('Recipient:', worker.address);
      console.log('Transaction:', signature);
      console.log('═══════════════════════════════════════════════════════\n');

      res.json({
        message: 'Payout successful',
        amount: solAmount,
        signature
      });
    } catch (solanaError: any) {
      console.error('\n❌ PAYOUT TRANSACTION FAILED');
      console.error('Error:', solanaError.message);
      console.error('Stack:', solanaError.stack);
      console.log('───────────────────────────────────────────────────────');
      
      // Rollback on failure
      console.log('🔄 ROLLING BACK BALANCE');
      await Worker.findByIdAndUpdate(req.userId, {
        $inc: {
          pendingAmount: amountToTransfer,
          lockedAmount: -amountToTransfer
        }
      });
      const rolledBackWorker = await Worker.findById(req.userId);
      console.log('After rollback:');
      console.log('  Pending:', rolledBackWorker!.pendingAmount, 'lamports');
      console.log('  Locked:', rolledBackWorker!.lockedAmount, 'lamports');

      await Payout.create({
        workerId: req.userId,
        amount: amountToTransfer,
        signature: 'failed',
        status: PayoutStatus.Failure
      });
      console.log('💾 Failure record saved');
      console.log('═══════════════════════════════════════════════════════\n');

      return res.status(500).json({ 
        error: 'Payout transaction failed',
        message: solanaError.message || 'Blockchain transaction error',
        details: 'Check if parent wallet has sufficient SOL balance on Devnet'
      });
    }
  } catch (error: any) {
    console.error('\n❌ PAYOUT ERROR:', error.message);
    console.error('Stack:', error.stack);
    console.log('═══════════════════════════════════════════════════════\n');
    res.status(500).json({ 
      error: 'Payout failed',
      message: error.message || 'Unknown error occurred'
    });
  }
});

// Get Submissions History
router.get('/submissions', workerAuthMiddleware, async (req: AuthRequest, res) => {
  try {
    const submissions = await Submission.find({ workerId: req.userId })
      .populate('taskId')
      .sort({ createdAt: -1 });

    const formattedSubmissions = submissions.map((sub: any) => {
      const task = sub.taskId;
      const selectedOption = task.options.find((opt: any) => opt._id.toString() === sub.optionId.toString());
      
      return {
        _id: sub._id,
        taskId: {
          title: task.title,
          amount: task.amount
        },
        option: {
          imageUrl: selectedOption?.imageUrl || ''
        },
        amount: sub.amount,
        createdAt: sub.createdAt
      };
    });

    res.json({ submissions: formattedSubmissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Get Payouts History
router.get('/payouts', workerAuthMiddleware, async (req: AuthRequest, res) => {
  try {
    const payouts = await Payout.find({ workerId: req.userId })
      .sort({ createdAt: -1 });

    res.json({ payouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payouts' });
  }
});

export default router;
