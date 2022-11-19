import { config } from "dotenv";
import { App } from "./app";

config();
import "../infrastructure/connections/mongoose";
const port: number = 8000;
const application = new App((process.env.PORT as undefined) || port);
application.start();
