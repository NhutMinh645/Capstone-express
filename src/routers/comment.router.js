import { Router } from 'express';
import { add, addCommentValidate } from '../controllers/comment.controller.js';
import { protect } from '../common/middlewares/protect.js';

const r = Router();
+ r.post('/:imageId/comments', protect, addCommentValidate, add);
export default r;
