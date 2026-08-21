import { Response } from 'express';
import Task from '../models/Task';
import Note from '../models/Note';
import Subject from '../models/Subject';
import User from '../models/User';
import { AuthRequest } from '../types/auth.types';
import { sendSuccess, sendError } from '../utils/ApiResponse';

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const [
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      totalNotes,
      totalSubjects,
      recentTasks,
    ] = await Promise.all([
      Task.countDocuments({ userId }),
      Task.countDocuments({ userId, status: 'completed' }),
      Task.countDocuments({ userId, status: 'pending' }),
      Task.countDocuments({ userId, status: 'in-progress' }),
      Note.countDocuments({ userId }),
      Subject.countDocuments({ userId }),
      Task.find({ userId, status: { $ne: 'completed' } }).sort({ createdAt: -1 }).limit(5),
    ]);

    const productivity = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    sendSuccess(res, {
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      totalNotes,
      totalSubjects,
      productivity,
      recentTasks,
    }, 'Dashboard stats fetched');
  } catch (error) {
    console.error(' Dashboard stats error:', error);
    sendError(res, 'Server error', 500, error);
  }
};

export const getAdminStats = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [totalUsers, totalTasksAllUsers, totalNotesAllUsers] = await Promise.all([
      User.countDocuments(),
      Task.countDocuments(),
      Note.countDocuments(),
    ]);

    sendSuccess(res, { totalUsers, totalTasksAllUsers, totalNotesAllUsers }, 'Admin stats fetched');
  } catch (error) {
    console.error(' Admin stats error:', error);
    sendError(res, 'Server error', 500, error);
  }
};