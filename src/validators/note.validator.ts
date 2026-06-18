import { Request, Response, NextFunction } from 'express';

export const createNoteValidation = (req: Request, res: Response, next: NextFunction): void => {
  const { title, content } = req.body;
  if (!title || title.trim().length === 0) {
    res.status(400).json({ success: false, message: 'Note title is required' });
    return;
  }
  if (!content || content.trim().length === 0) {
    res.status(400).json({ success: false, message: 'Note content is required' });
    return;
  }
  if (title.trim().length > 200) {
    res.status(400).json({ success: false, message: 'Title too long (max 200 chars)' });
    return;
  }
  next();

};
