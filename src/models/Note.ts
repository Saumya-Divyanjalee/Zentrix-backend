import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  subject?: string;
  summary?: string;
  userId: mongoose.Types.ObjectId;
}

const NoteSchema = new Schema<INote>(
  {
    title:   { type: String, required: true, trim: true },
    content: { type: String, required: true },
    subject: { type: String, default: 'General' },
    summary: { type: String, default: '' },
    userId:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);


export default mongoose.model<INote>('Note', NoteSchema);
