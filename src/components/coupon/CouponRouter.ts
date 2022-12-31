import { Router } from "express";
import CouponsController from "./CouponsController";

const router: Router = Router();
const couponsController = new CouponsController();

export default router;