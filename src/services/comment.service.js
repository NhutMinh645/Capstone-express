import { prisma } from '../common/db/prisma.js';
import createError from 'http-errors';

export const addComment = async ({ imageId, userId, content }) => {
  const img = await prisma.image.findUnique({ where: { id: imageId } });
  if (!img) throw createError(404, 'Image not found');
  return prisma.comment.create({ data: { imageId, userId, content } });
};
