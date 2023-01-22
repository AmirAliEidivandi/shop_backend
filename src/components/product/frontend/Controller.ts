import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../services/CatchAsync";
import ProductTransformer from "./Transformer";
import CommentTransformer from "../../comments/CommentTransformer";
import NotFoundException from "../../exceptions/NotFoundException";
import IProductRepository from "../repositories/IProductRepository";
import ProductMongoRepository from "../repositories/ProductMongoRepository";
import CommentMongoRepository from "../../comments/repositories/CommentMongoRepository";

export default class ProductsController {
    private readonly productsRepository: IProductRepository;
    private readonly productsTransformer: ProductTransformer;
    constructor() {
        this.productsRepository = new ProductMongoRepository();
        this.productsTransformer = new ProductTransformer();
        this.list = this.list.bind(this);
        this.show = this.show.bind(this);
        this.comments = this.comments.bind(this);
    }

    public list = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const perPage = 50;
        const page = req.query.page || 1;
        const offset = ((page as number) - 1) * perPage;

        const allProducts = await this.productsRepository.findMany({}, undefined, { perPage, offset });
        res.status(200).json(this.productsTransformer.collection(allProducts));
    });

    public show = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        const singleProduct = await this.productsRepository.findOne(id, ["category"]);
        if (!singleProduct) {
            throw new NotFoundException("محصول مورد نظر یافت نشد");
        }
        res.status(200).json(this.productsTransformer.transform(singleProduct));
    });

    public comments = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const commentTransformer = new CommentTransformer();
        const commentsRepository = new CommentMongoRepository();

        const { id } = req.params;
        const comments = await commentsRepository.findByProduct(id);
        res.status(200).json(commentTransformer.collection(comments));
    });
}
