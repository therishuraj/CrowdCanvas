import mongoose, { Schema, Document } from 'mongoose';

// User Model
export interface IUser extends Document {
  address: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  address: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', userSchema);

// Worker Model
export interface IWorker extends Document {
  address: string;
  pendingAmount: number;
  lockedAmount: number;
  createdAt: Date;
}

const workerSchema = new Schema<IWorker>({
  address: { type: String, required: true, unique: true },
  pendingAmount: { type: Number, default: 0 },
  lockedAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const Worker = mongoose.model<IWorker>('Worker', workerSchema);

// Task Model
export interface IOption {
  _id: mongoose.Types.ObjectId;
  imageUrl: string;
}

export interface ITask extends Document {
  title: string;
  userId: mongoose.Types.ObjectId;
  signature: string;
  amount: number;
  done: boolean;
  options: IOption[];
  createdAt: Date;
}

const optionSchema = new Schema<IOption>({
  imageUrl: { type: String, required: true }
}, { _id: true });

const taskSchema = new Schema<ITask>({
  title: { type: String, default: 'Select the most clickable thumbnail' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  signature: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  done: { type: Boolean, default: false },
  options: [optionSchema],
  createdAt: { type: Date, default: Date.now }
});

export const Task = mongoose.model<ITask>('Task', taskSchema);

// Submission Model
export interface ISubmission extends Document {
  taskId: mongoose.Types.ObjectId;
  workerId: mongoose.Types.ObjectId;
  optionId: mongoose.Types.ObjectId;
  amount: number;
  createdAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
  taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
  optionId: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Unique constraint: one submission per worker per task
submissionSchema.index({ workerId: 1, taskId: 1 }, { unique: true });

export const Submission = mongoose.model<ISubmission>('Submission', submissionSchema);

// Payout Model
export enum PayoutStatus {
  Processing = 'Processing',
  Success = 'Success',
  Failure = 'Failure'
}

export interface IPayout extends Document {
  workerId: mongoose.Types.ObjectId;
  amount: number;
  signature: string;
  status: PayoutStatus;
  createdAt: Date;
}

const payoutSchema = new Schema<IPayout>({
  workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
  amount: { type: Number, required: true },
  signature: { type: String, required: true },
  status: { type: String, enum: Object.values(PayoutStatus), default: PayoutStatus.Processing },
  createdAt: { type: Date, default: Date.now }
});

export const Payout = mongoose.model<IPayout>('Payout', payoutSchema);
