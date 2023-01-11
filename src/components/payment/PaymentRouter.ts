import { Router } from "express";
import PaymentsController from "./PaymentsController";

const router: Router = Router();
const paymentsController = new PaymentsController();

router.get("/", paymentsController.index);
router.get('/:paymentID', paymentsController.findPayment)

export default router;
