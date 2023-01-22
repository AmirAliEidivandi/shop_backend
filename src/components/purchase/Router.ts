import { Router } from "express";
import PurchaseController from "./Controller";

const router: Router = Router();
const purchaseController = new PurchaseController();

export default router;
