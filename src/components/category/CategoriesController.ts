import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../services/CatchAsync";
import Category from "./model/Category";

export default class CategoriesController {
    public store = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const newCategory = await Category.create({
            ...req.body,
        });
        res.status(201).json(newCategory);
    });

    public list = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const categoriesList = await Category.find({}, { title: 1, slug: 1 });
        res.status(200).json(categoriesList);
    });

    public attributes = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const categoryID = req.params.id;
        const category = await Category.findById(categoryID);
        res.status(200).json(
            category?.groups.map((group) => {
                return {
                    title: group.title,
                    attributes: group.attributes,
                };
            })
        );
    });
}
