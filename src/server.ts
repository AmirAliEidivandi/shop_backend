import { config as loadEnvironmentsVars } from "dotenv";
import App from "./app";
import startMongoose from "../infrastructure/connections/mongoose";

loadEnvironmentsVars();
startMongoose();
const port: number = (process.env.PORT as unknown as number) || 8080;
const application = new App(port);
application.start();
