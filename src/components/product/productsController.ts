import { Request, Response } from "express";

export default class ProductsController {
    constructor() {}

    public index(req: Request, res: Response) {
        res.send({ allProducts: [] });
    }
}