import { Response } from 'express';
import Note from '../models/Note';
import { AuthRequest } from '../types/auth.types';
import { sendSuccess, sendCreated, sendError } from '../utils/ApiResponse';

export const getNotes = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { subject } = req.query;
    const filter: Record<string, unknown> = { userId: req.user?.id };
    if (subject) filter.subject = subject;
    const notes = await Note.find(filter).sort({ createdAt: -1 });
    sendSuccess(res, notes, 'Notes fetched');
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const getNoteById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user?.id });
    if (!note) { res.status(404).json({ success: false, message: 'Note not found' }); return; }
    sendSuccess(res, note);
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const createNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, content, subject } = req.body;
    const note = await Note.create({ title, content, subject, userId: req.user?.id });
    sendCreated(res, note, 'Note created');
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const updateNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id }, req.body, { new: true }
    );
    if (!note) { res.status(404).json({ success: false, message: 'Note not found' }); return; }
    sendSuccess(res, note, 'Note updated');
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const deleteNote = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user?.id });
    if (!note) { res.status(404).json({ success: false, message: 'Note not found' }); return; }
    sendSuccess(res, null, 'Note deleted');
  } catch (error) { sendError(res, 'Server error', 500, error); }

};
