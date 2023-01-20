import { Router } from "express";
import CommentsController from "./CommentsController";

const router: Router = Router();
const commentsController = new CommentsController();

router.get('/', commentsController.index);

export default router;
