import { Router } from "express";
import ShipmentsController from "./ShipmentsController";

const router: Router = Router();
const shipmentsController = new ShipmentsController();

router.get("/", shipmentsController.index);

export default router;
