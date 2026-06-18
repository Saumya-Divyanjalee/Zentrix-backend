import jwt from 'jsonwebtoken';

export const generateAccessToken = (id: string, email: string, role: string): string =>
  jwt.sign({ id, email, role }, process.env.JWT_SECRET as string, { expiresIn: '7d' });


export const generateRefreshToken = (id: string): string =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' });
