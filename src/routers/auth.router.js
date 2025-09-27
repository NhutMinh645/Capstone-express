import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validate } from '../common/middlewares/validate.js';
import { loginSchema, registerSchema } from '../models/auth.schema.js';

const r = Router();
r.post('/register', validate(registerSchema), register);
r.post('/login', validate(loginSchema), login);
export default r;
