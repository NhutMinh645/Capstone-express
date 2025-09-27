import * as svc from '../services/auth.service.js';

export const register = async (req, res, next) => {
  try {
    const result = await svc.register(req.body);
    res.status(201).json(result);
  } catch (e) { next(e); }
};

export const login = async (req, res, next) => {
  try {
    const result = await svc.login(req.body);
    res.json(result);
  } catch (e) { next(e); }
};
