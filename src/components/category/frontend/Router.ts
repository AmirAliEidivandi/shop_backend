import { Router } from "express";
import CategoriesController from "./Controller";

const router: Router = Router();
const categoriesController = new CategoriesController();

export default router;
