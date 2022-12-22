import { Router } from "express";
import PaymentsController from "./PaymentsController";

const router: Router = Router();
const paymentsController = new PaymentsController();

export default router;