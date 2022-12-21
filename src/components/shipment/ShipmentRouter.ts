import { Router } from "express";
import ShipmentsController from "./ShipmentsController";

const router: Router = Router();
const shipmentsController = new ShipmentsController();

export default router;
