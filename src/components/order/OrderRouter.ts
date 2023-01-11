import { Router } from "express";
import OrdersController from "./OrdersController";

const router: Router = Router();
const ordersControllers = new OrdersController();

router.get("/", ordersControllers.index);
router.get("/:orderID", ordersControllers.findOrder);
router.patch("/:orderID", ordersControllers.updateStatus);

export default router;
