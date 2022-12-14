import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path = require("path");
import IProductRepository from "./repositories/IProductRepository";
import ProductMongoRepository from "./repositories/ProductMongoRepository";

export default class ProductsController {
    private productsRepository: IProductRepository;
    constructor() {
        this.productsRepository = new ProductMongoRepository();
        this.index = this.index.bind(this);
    }

    public async index(req: Request, res: Response) {
        const allProducts = await this.productsRepository.findMany({});
        res.send({ allProducts });
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
