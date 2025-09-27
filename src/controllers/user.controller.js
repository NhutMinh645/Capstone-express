import * as svc from '../services/user.service.js';

export const me = async (req, res, next) => {
  try { res.json(await svc.me(req.user.id)); } catch (e) { next(e); }
};

export const updateMe = async (req, res, next) => {
  try { res.json(await svc.updateMe(req.user.id, req.body)); } catch (e) { next(e); }
};
