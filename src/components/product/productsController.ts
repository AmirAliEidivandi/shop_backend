import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path = require("path");

export default class ProductsController {
    constructor() {}

    public index(req: Request, res: Response) {
        res.send({ allProducts: [] });
    }

    public create(req: Request, res: Response) {
        if (req.files) {
            const thumbnail: UploadedFile = req.files.thumbnail as UploadedFile;
            thumbnail.mv(path.join(process.env.APP_ROOT as string, `/uploads/${thumbnail.name}`));
            res.send(thumbnail);
        }
        res.send({ attributes: JSON.parse(req.body.attributes) });
    }
}
