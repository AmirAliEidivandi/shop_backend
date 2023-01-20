import { Router } from "express";
import PaymentsController from "./PaymentsController";

const router: Router = Router();
const paymentsController = new PaymentsController();

router.get("/", paymentsController.index);

export default router;
