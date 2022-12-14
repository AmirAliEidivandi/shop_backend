import { Request, Response, NextFunction } from "express";
import Category from "./model/Category";

export default class CategoriesController {
    public async store(req: Request, res: Response, next: NextFunction) {
        const newCategory = await Category.create({
            ...req.body,
        });

        return res.json(newCategory);
    }

    public async list(req: Request, res: Response, next: NextFunction) {
        const categoriesList = await Category.find({}, { title: 1, slug: 1 });
        return res.json(categoriesList);
    }

    public async attributes(req: Request, res: Response, next: NextFunction) {
        const categoryID = req.params.id;
        const category = await Category.findById(categoryID);
        res.send(
            category?.groups.map((group) => {
                return {
                    title: group.title,
                    attributes: group.attributes,
                };
            })
        );
    }
}
