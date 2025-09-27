import createError from 'http-errors';
import { prisma } from '../common/db/prisma.js';

export const listImages = async ({ skip, take }) => {
  const [items, total] = await Promise.all([
    prisma.image.findMany({
      skip, take,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, fullName: true, email: true } } },
    }),
    prisma.image.count(),
  ]);
  return { items, total };
};

// trước đây có mode: 'insensitive' -> gây lỗi
export async function searchImages({ name = "", page = 1, size = 20 }) {
  const skip = (Number(page) - 1) * Number(size);
  const take = Number(size);

  // Với MySQL, so khớp chữ hoa/thường phụ thuộc COLLATION của cột/bảng/DB
  const where = name
    ? { name: { contains: name } } // ✅ bỏ mode
    : {};

  const [items, total] = await Promise.all([
    prisma.image.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { id: true, fullName: true, email: true } },
      },
    }),
    prisma.image.count({ where }),
  ]);

  return { items, total, page: Number(page), size: Number(size) };
}


export const getImageWithAuthor = async (imageId) => {
  const image = await prisma.image.findUnique({
    where: { id: imageId },
    include: { user: { select: { id: true, fullName: true, email: true, avatar: true } } },
  });
  if (!image) throw createError(404, 'Image not found');
  return image;
};

export const getCommentsByImage = async (imageId) => {
  return prisma.comment.findMany({
    where: { imageId },
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { id: true, fullName: true, email: true, avatar: true } } },
  });
};

export const isSavedByUser = async ({ imageId, userId }) => {
  const saved = await prisma.savedImage.findUnique({
    where: { userId_imageId: { userId, imageId } },
  });
  return !!saved;
};

export const createImage = async ({ userId, name, description, url }) => {
  return prisma.image.create({ data: { userId, name, description, url } });
};

export const deleteImage = async ({ imageId, userId }) => {
  const image = await prisma.image.findUnique({ where: { id: imageId } });
  if (!image) throw createError(404, 'Image not found');
  if (image.userId !== userId) throw createError(403, 'You can only delete your own image');
  await prisma.comment.deleteMany({ where: { imageId } });
  await prisma.savedImage.deleteMany({ where: { imageId } });
  await prisma.image.delete({ where: { id: imageId } });
  return { success: true };
};

export const listCreatedByMe = async (userId) =>
  prisma.image.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });

export const listSavedByMe = async (userId) =>
  prisma.savedImage.findMany({
    where: { userId },
    include: { image: true },
    orderBy: { savedAt: 'desc' },
  });

export const toggleSave = async ({ imageId, userId }) => {
  const existing = await prisma.savedImage.findUnique({ where: { userId_imageId: { userId, imageId } } });
  if (existing) {
    await prisma.savedImage.delete({ where: { userId_imageId: { userId, imageId } } });
    return { saved: false };
  }
  await prisma.savedImage.create({ data: { userId, imageId } });
  return { saved: true };
};
