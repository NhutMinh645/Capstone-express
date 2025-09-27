import * as svc from '../services/comment.service.js';
import Joi from 'joi';
import { validate } from '../common/middlewares/validate.js';

export const addCommentValidate = validate(Joi.object({ content: Joi.string().min(1).max(1000).required() }));

export const add = async (req, res, next) => {
  try {
    const imageId = +req.params.imageId;
    const { content } = req.body;
    const data = await svc.addComment({ imageId, userId: req.user.id, content });
    res.status(201).json(data);
  } catch (e) { next(e); }
};
