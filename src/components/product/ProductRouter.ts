import { Router } from "express";
import ProductsController from "./ProductsController";
const productsControllersInstance = new ProductsController();

const router: Router = Router();

router.get("/", productsControllersInstance.index);
router.post('/', productsControllersInstance.create);

export default router;
