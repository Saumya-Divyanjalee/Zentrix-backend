import mongoose, { Document, Schema } from 'mongoose';
import { Priority, TaskStatus } from '../types/task.types';

export interface ITask extends Document {
  title: string;
  description?: string;
  deadline?: Date;
  priority: Priority;
  status: TaskStatus;
  subject?: string;
  userId: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    deadline:    { type: Date },
    priority:    { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status:      { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    subject:     { type: String, default: '' },
    userId:      { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);


export default mongoose.model<ITask>('Task', TaskSchema);
