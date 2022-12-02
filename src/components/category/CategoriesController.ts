import { Request, Response, NextFunction } from "express";

export default class CategoriesController {
    public store(req: Request, res: Response, next: NextFunction) {
        res.send({ success: true });
    }
}
