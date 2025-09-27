import Joi from 'joi';

export const updateMeSchema = Joi.object({
  fullName: Joi.string().max(191),
  age: Joi.number().integer().min(0).allow(null),
}).min(1);
