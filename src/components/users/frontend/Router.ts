import { Router } from "express";
import UsersController from "./Controller";

const router: Router = Router();
const usersController = new UsersController();

export default router;
