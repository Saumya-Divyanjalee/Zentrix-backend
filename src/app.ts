import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

import authRoutes      from './routes/auth.routes';
import taskRoutes      from './routes/task.routes';
import noteRoutes      from './routes/note.routes';
import subjectRoutes   from './routes/subject.routes';
import dashboardRoutes from './routes/dashboard.routes';
import aiRoutes        from './routes/ai.routes';

import { errorHandler, notFound } from './middleware/error.middleware';

connectDB();

const app = express();

app.use(cors({
  origin: function(origin, callback) {
    // Allow all origins temporarily to fix the issue
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Zentrix API v2.0 ',
    version: '2.0.0',
    endpoints: {
      auth:      '/api/auth',
      tasks:     '/api/tasks',
      notes:     '/api/notes',
      subjects:  '/api/subjects',
      dashboard: '/api/dashboard',
      ai:        '/api/ai',
    },
  });
});

app.use('/api/auth',      authRoutes);
app.use('/api/tasks',     taskRoutes);
app.use('/api/notes',     noteRoutes);
app.use('/api/subjects',  subjectRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai',        aiRoutes);

app.use(notFound);
app.use(errorHandler);


export default app;