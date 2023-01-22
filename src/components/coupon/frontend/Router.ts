import { Router } from "express";
import CouponsController from "./Controller";

const router: Router = Router();
const couponsController = new CouponsController();

export default router;
