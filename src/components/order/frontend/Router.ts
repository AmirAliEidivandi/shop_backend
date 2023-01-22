import { Router } from "express";
import OrdersController from "./Controller";

const router: Router = Router();
const orderssController = new OrdersController();

export default router;
