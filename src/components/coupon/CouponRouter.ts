import { Router } from "express";
import CouponsController from "./CouponsController";

const router: Router = Router();
const couponsController = new CouponsController();

router.get("/", couponsController.index);
router.post("/", couponsController.store);

export default router;
