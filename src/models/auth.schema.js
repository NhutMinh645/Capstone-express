import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().max(191).required(),
  password: Joi.string().min(6).max(191).required(),
  fullName: Joi.string().allow('', null),
  age: Joi.number().integer().min(0).allow(null),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
