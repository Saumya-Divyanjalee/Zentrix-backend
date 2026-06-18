import { Response } from 'express';
import { AuthRequest } from '../types/auth.types';
import { summarizeNote, generateQuiz, generateStudyPlan } from '../services/ai.service';
import Note from '../models/Note';
import { sendSuccess, sendError } from '../utils/ApiResponse';
import AIHistory from '../models/AIHistory';

export const summarize = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { content, noteId } = req.body;
    if (!content) { res.status(400).json({ success: false, message: 'Content is required' }); return; }
    const summary = await summarizeNote(content);

    await AIHistory.create({
      type: 'summarize',
      input: content,
      output: summary,
      userId: req.user?.id,
    });

    if (noteId) {
      await Note.findOneAndUpdate({ _id: noteId, userId: req.user?.id }, { summary });
    }
    sendSuccess(res, { summary }, 'Summary generated');
  } catch (error) {
    console.error('❌ AI summarize error:', error);
    sendError(res, 'AI service error', 500, error);
  }
};

export const quiz = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { content } = req.body;
    if (!content) { res.status(400).json({ success: false, message: 'Content is required' }); return; }
    const questions = await generateQuiz(content);

    await AIHistory.create({ type: 'quiz', input: content, output: questions, userId: req.user?.id });

    sendSuccess(res, { questions }, 'Quiz generated');
  } catch (error) {
    console.error('❌ AI quiz error:', error);
    sendError(res, 'AI service error', 500, error);
  }
};

export const studyPlan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { topic, days } = req.body;
    if (!topic) { res.status(400).json({ success: false, message: 'Topic is required' }); return; }
    const plan = await generateStudyPlan(topic, days || 7);

    await AIHistory.create({ type: 'plan', input: topic, output: plan, userId: req.user?.id });

    sendSuccess(res, { plan }, 'Study plan generated');
  } catch (error) {
    console.error('❌ AI study plan error:', error);
    sendError(res, 'AI service error', 500, error);
  }
};


export const getHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const history = await AIHistory.find({ userId: req.user?.id }).sort({ createdAt: -1 }).limit(50);
    sendSuccess(res, history, 'History fetched');
  } catch (error) {
    sendError(res, 'Server error', 500, error);
  }
};