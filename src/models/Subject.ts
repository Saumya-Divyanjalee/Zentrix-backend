import mongoose, { Document, Schema } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  color: string;
  userId: mongoose.Types.ObjectId;
}

const SubjectSchema = new Schema<ISubject>(
  {
    name:   { type: String, required: true, trim: true },
    color:  { type: String, default: '#6366f1' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);


export default mongoose.model<ISubject>('Subject', SubjectSchema);
