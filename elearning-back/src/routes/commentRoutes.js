import express from "express"
import * as commentController from "../controllers/commentController.js"

const router = express.Router();

router.get('/', commentController.getAllComments);
router.get('/:courseId', commentController.getDetailCommentsByCourseIdController);
router.post('/', commentController.createComment);
router.delete('/:id', commentController.deleteComment);

export default router ;
