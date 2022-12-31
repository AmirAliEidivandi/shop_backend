import { Router } from "express";
import CommentsController from "./CommentsController";

const router: Router = Router();
const commentsController = new CommentsController();

export default router;
