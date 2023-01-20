import { Router } from "express";
import SettingsController from "./SettingsController";

const router: Router = Router();
const settingsController = new SettingsController();

router.get('/', settingsController.index)
router.post('/', settingsController.store)

export default router;
