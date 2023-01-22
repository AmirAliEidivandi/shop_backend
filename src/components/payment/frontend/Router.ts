import { Router } from "express";
import PaymentssController from "./Controller";

const router: Router = Router();
const paymentsController = new PaymentssController();

router.get("/gateways", paymentsController.gatewaysList);

export default router;
