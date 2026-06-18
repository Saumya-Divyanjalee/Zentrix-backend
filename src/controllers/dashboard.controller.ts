import { Response } from 'express';
import Task from '../models/Task';
import Note from '../models/Note';
import Subject from '../models/Subject';
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
      Task.find({ userId, status: 'pending' }).sort({ deadline: 1 }).limit(5),
    ]);

    const productivity = totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

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
    sendError(res, 'Server error', 500, error);
  }

};
