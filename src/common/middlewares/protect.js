import createError from 'http-errors';
import { verifyToken } from '../security/jwt.js';
import { prisma } from '../db/prisma.js';

export const protect = async (req, _res, next) => {
  try {
    const raw = req.headers.authorization || '';
    const token = raw.startsWith('Bearer ') ? raw.slice(7) : null;
    if (!token) throw createError(401, 'Missing Authorization header');

    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) throw createError(401, 'Invalid token');

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    next(createError(401, err.message || 'Unauthorized'));
  }
};
