import { Router } from "express";
import UsersController from "./usersController";
const usersControllersInstance = new UsersController();

const usersRouter: Router = Router();

usersRouter.get("/", usersControllersInstance.index);
usersRouter.post("/", usersControllersInstance.create);

export default usersRouter;
