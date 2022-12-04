import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path = require("path");

export default class ProductsController {
    constructor() {}

    public index(req: Request, res: Response) {
        res.send({ allProducts: [] });
    }

    public create(req: Request, res: Response) {
        const thumbnail: UploadedFile = req.files?.thumbnail as UploadedFile;
        thumbnail.mv(path.join(process.env.APP_ROOT as string, `/uploads/${thumbnail.name}`), (err) => console.log(err.message));
        res.send(thumbnail);
    }
}
