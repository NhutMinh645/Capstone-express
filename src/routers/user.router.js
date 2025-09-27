import { Router } from 'express';
import * as ctrl from '../controllers/user.controller.js';
import { protect } from '../common/middlewares/protect.js';
import { validate } from '../common/middlewares/validate.js';
import { updateMeSchema } from '../models/user.schema.js';
import * as img from '../controllers/image.controller.js';

const r = Router();
r.get('/me', protect, ctrl.me);
r.put('/me', protect, validate(updateMeSchema), ctrl.updateMe);

r.get('/me/created', protect, img.myCreated);
r.get('/me/saved', protect, img.mySaved);

export default r;
