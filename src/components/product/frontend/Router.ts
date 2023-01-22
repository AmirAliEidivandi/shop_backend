import { Router } from "express";
import ProductsController from "./Controller";

const router: Router = Router();
const productsController = new ProductsController();

router.get("/", productsController.list);
router.get("/:id", productsController.show);
router.get("/:id/comments", productsController.comments);

export default router;
