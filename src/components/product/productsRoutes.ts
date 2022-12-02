import { Router } from "express";
import ProductsController from "./productsController";
const productsControllersInstance = new ProductsController();

const usersRouter: Router = Router();

usersRouter.get("/", productsControllersInstance.index);

export default usersRouter;
