import { config } from "dotenv";
import { App } from "./app";
import startMongoose from "../infrastructure/connections/mongoose";

config();
startMongoose();
const port: number = 8000;
const application = new App((process.env.PORT as undefined) || port);
application.start();
