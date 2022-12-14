import { Application } from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as fileUpload from "express-fileupload";

const boot = (app: Application) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(fileUpload());
};

export default boot;
