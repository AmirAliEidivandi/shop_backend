import { Router } from "express";
import UsersController from "./usersController";
const usersControllersInstance = new UsersController();

const router: Router = Router();

router.get("/", usersControllersInstance.index);
router.post("/", usersControllersInstance.create);

export default router;
