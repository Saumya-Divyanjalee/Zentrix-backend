import { Response } from 'express';
import Task from '../models/Task';
import { AuthRequest } from '../types/auth.types';
import { sendSuccess, sendCreated, sendError } from '../utils/ApiResponse';

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status, priority, subject } = req.query;
    const filter: Record<string, unknown> = { userId: req.user?.id };
    if (status)   filter.status   = status;
    if (priority) filter.priority = priority;
    if (subject)  filter.subject  = subject;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    sendSuccess(res, tasks, 'Tasks fetched');
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const getTaskById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user?.id });
    if (!task) { res.status(404).json({ success: false, message: 'Task not found' }); return; }
    sendSuccess(res, task);
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, deadline, priority, status, subject } = req.body;
    const task = await Task.create({ title, description, deadline, priority, status, subject, userId: req.user?.id });
    sendCreated(res, task, 'Task created');
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.id }, req.body, { new: true, runValidators: true }
    );
    if (!task) { res.status(404).json({ success: false, message: 'Task not found' }); return; }
    sendSuccess(res, task, 'Task updated');
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user?.id });
    if (!task) { res.status(404).json({ success: false, message: 'Task not found' }); return; }
    sendSuccess(res, null, 'Task deleted');
  } catch (error) { sendError(res, 'Server error', 500, error); }

};
