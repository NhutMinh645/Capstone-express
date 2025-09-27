import { Router } from 'express';
import * as ctrl from '../controllers/image.controller.js';
import { protect } from '../common/middlewares/protect.js';
import { validate } from '../common/middlewares/validate.js';
import { createImageSchema, searchImageSchema } from '../models/image.schema.js';
import { upload } from '../common/middlewares/upload.js';

const r = Router();

// Home
r.get('/', ctrl.list);
r.get('/search', validate(searchImageSchema, 'query'), ctrl.search);

// Detail
r.get('/:imageId', ctrl.detail);
r.get('/:imageId/comments', ctrl.comments);

// Saved check & toggle
r.get('/:imageId/saved', protect, ctrl.saved);
r.post('/:imageId/save-toggle', protect, ctrl.toggleSave);

// Create / Delete
r.post('/', protect, upload.single('image'), validate(createImageSchema), ctrl.create);
r.delete('/:imageId', protect, ctrl.remove);

export default r;
