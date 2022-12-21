import { Router } from "express";
import SettingsController from "./SettingsController";

const router: Router = Router();
const settingsController = new SettingsController();

export default router;
