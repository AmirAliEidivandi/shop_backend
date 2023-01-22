import { Router } from "express";
import HomeController from "./Controller";

const router: Router = Router();
const homeController = new HomeController();

export default router;
