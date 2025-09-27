import * as svc from '../services/image.service.js';
import { parsePaging } from '../common/utils/pagination.js';
import createError from 'http-errors';

export const list = async (req, res, next) => {
  try {
    const { skip, take, page, size } = parsePaging(req.query);
    const data = await svc.listImages({ skip, take });
    res.json({ ...data, page, size });
  } catch (e) { next(e); }
};

export const search = async (req, res, next) => {
  try {
    const { skip, take, page, size } = parsePaging(req.query);
    const data = await svc.searchImages({ name: req.query.name, skip, take });
    res.json({ ...data, page, size });
  } catch (e) { next(e); }
};

export const detail = async (req, res, next) => {
  try {
    const imageId = +req.params.imageId;
    res.json(await svc.getImageWithAuthor(imageId));
  } catch (e) { next(e); }
};

export const comments = async (req, res, next) => {
  try {
    const imageId = +req.params.imageId;
    res.json(await svc.getCommentsByImage(imageId));
  } catch (e) { next(e); }
};

export const saved = async (req, res, next) => {
  try {
    const imageId = +req.params.imageId;
    res.json({ saved: await svc.isSavedByUser({ imageId, userId: req.user.id }) });
  } catch (e) { next(e); }
};

export const create = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const fileUrl = req.file ? `/images/${req.file.filename}` : null;
    if (!fileUrl) throw createError(400, 'Missing image file (field name: image)');
    const image = await svc.createImage({ userId: req.user.id, name, description, url: fileUrl });
    res.status(201).json(image);
  } catch (e) { next(e); }
};

export const remove = async (req, res, next) => {
  try {
    const imageId = +req.params.imageId;
    res.json(await svc.deleteImage({ imageId, userId: req.user.id }));
  } catch (e) { next(e); }
};

export const toggleSave = async (req, res, next) => {
  try {
    const imageId = +req.params.imageId;
    res.json(await svc.toggleSave({ imageId, userId: req.user.id }));
  } catch (e) { next(e); }
};

export const myCreated = async (req, res, next) => {
  try { res.json(await svc.listCreatedByMe(req.user.id)); } catch (e) { next(e); }
};
export const mySaved = async (req, res, next) => {
  try { res.json(await svc.listSavedByMe(req.user.id)); } catch (e) { next(e); }
};
