import { Router } from "express";
import OrdersController from "./OrdersController";

const router: Router = Router();
const ordersControllers = new OrdersController();

router.get("/", ordersControllers.index);

export default router;
