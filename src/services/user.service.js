import { prisma } from '../common/db/prisma.js';

export const me = async (id) =>
  prisma.user.findUnique({ where: { id }, select: { id: true, email: true, fullName: true, age: true, avatar: true } });

export const updateMe = async (id, data) =>
  prisma.user.update({ where: { id }, data, select: { id: true, email: true, fullName: true, age: true, avatar: true } });
