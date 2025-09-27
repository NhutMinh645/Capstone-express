import createError from 'http-errors';
import { prisma } from '../common/db/prisma.js';
import { hash, compare } from '../common/security/password.js';
import { signToken } from '../common/security/jwt.js';

export const register = async ({ email, password, fullName, age }) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw createError(409, 'Email already in use');
  const hashed = await hash(password);
  const user = await prisma.user.create({
    data: { email, password: hashed, fullName, age },
    select: { id: true, email: true, fullName: true, age: true },
  });
  const token = signToken({ id: user.id });
  return { user, token };
};

export const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw createError(401, 'Invalid credentials');
  const ok = await compare(password, user.password);
  if (!ok) throw createError(401, 'Invalid credentials');
  const token = signToken({ id: user.id });
  return { user: { id: user.id, email: user.email, fullName: user.fullName, age: user.age }, token };
};
