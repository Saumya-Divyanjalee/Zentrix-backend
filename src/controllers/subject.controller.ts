import { Response } from 'express';
import Subject from '../models/Subject';
import { AuthRequest } from '../types/auth.types';
import { sendSuccess, sendCreated, sendError } from '../utils/ApiResponse';

export const getSubjects = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subjects = await Subject.find({ userId: req.user?.id }).sort({ name: 1 });
    sendSuccess(res, subjects, 'Subjects fetched');
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const createSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, color } = req.body;
    if (!name) { res.status(400).json({ success: false, message: 'Subject name required' }); return; }
    const existing = await Subject.findOne({ name, userId: req.user?.id });
    if (existing) { res.status(400).json({ success: false, message: 'Subject already exists' }); return; }
    const subject = await Subject.create({ name, color: color || '#6366f1', userId: req.user?.id });
    sendCreated(res, subject, 'Subject created');
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const updateSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subject = await Subject.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id }, req.body, { new: true }
    );
    if (!subject) { res.status(404).json({ success: false, message: 'Subject not found' }); return; }
    sendSuccess(res, subject, 'Subject updated');
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const deleteSubject = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const subject = await Subject.findOneAndDelete({ _id: req.params.id, userId: req.user?.id });
    if (!subject) { res.status(404).json({ success: false, message: 'Subject not found' }); return; }
    sendSuccess(res, null, 'Subject deleted');
  } catch (error) { sendError(res, 'Server error', 500, error); }

};
