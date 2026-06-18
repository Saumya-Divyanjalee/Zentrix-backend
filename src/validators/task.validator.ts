import { Request, Response, NextFunction } from 'express';

export const createTaskValidation = (req: Request, res: Response, next: NextFunction): void => {
  const { title } = req.body;
  if (!title || title.trim().length === 0) {
    res.status(400).json({ success: false, message: 'Task title is required' });
    return;
  }
  if (title.trim().length > 200) {
    res.status(400).json({ success: false, message: 'Task title too long (max 200 chars)' });
    return;
  }
  const validPriorities = ['low', 'medium', 'high'];
  if (req.body.priority && !validPriorities.includes(req.body.priority)) {
    res.status(400).json({ success: false, message: 'Priority must be low, medium or high' });
    return;
  }
  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (req.body.status && !validStatuses.includes(req.body.status)) {
    res.status(400).json({ success: false, message: 'Status must be pending, in-progress or completed' });
    return;
  }
  next();

};
