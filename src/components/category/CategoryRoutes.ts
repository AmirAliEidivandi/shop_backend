import { Router } from "express";
import Controller from "./CategoriesController";
const categoriesController = new Controller();
const router: Router = Router();

router.post("/", categoriesController.store);

export default router;
