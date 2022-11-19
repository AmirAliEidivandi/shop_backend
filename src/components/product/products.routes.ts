import { Router } from "express";
import ProductsController from "./products.controller";
const productsControllersInstance = new ProductsController();

const usersRouter: Router = Router();

usersRouter.get("/", productsControllersInstance.index);

export default usersRouter;
