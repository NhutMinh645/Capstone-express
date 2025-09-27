import Joi from 'joi';

export const createImageSchema = Joi.object({
  name: Joi.string().max(191).required(),
  description: Joi.string().max(1000).allow('', null),
});

export const searchImageSchema = Joi.object({
  name: Joi.string().allow('', null),
  page: Joi.number().integer().min(1).default(1),
  size: Joi.number().integer().min(1).max(100).default(20),
});
