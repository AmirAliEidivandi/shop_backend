import { Request, Response } from "express";

class ProductsController {
    constructor() {}

    public index(req: Request, res: Response) {
        res.send({ allProducts: [] });
    }
}

export default ProductsController;
