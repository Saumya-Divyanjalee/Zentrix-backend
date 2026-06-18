import mongoose, { Document, Schema } from 'mongoose';

export interface IAIHistory extends Document {
  type: 'summarize' | 'quiz' | 'plan';
  input: string;
  output: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const AIHistorySchema = new Schema<IAIHistory>(
  {
    type:   { type: String, enum: ['summarize', 'quiz', 'plan'], required: true },
    input:  { type: String, required: true },
    output: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }

);

export default mongoose.model<IAIHistory>('AIHistory', AIHistorySchema);