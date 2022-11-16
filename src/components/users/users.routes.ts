import { Router } from "express";
import UsersController from "./users.controller";
const usersControllersInstance = new UsersController();

const usersRouter: Router = Router();

usersRouter.get("/", usersControllersInstance.index);
usersRouter.post("/", usersControllersInstance.create);

export default usersRouter;
