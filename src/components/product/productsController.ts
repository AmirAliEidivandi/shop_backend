import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { catchAsync } from "../../services/CatchAsync";
import UploadService from "../../services/UploadService";
import ProductTransformer from "./ProductTransformer";
import IProductRepository from "./repositories/IProductRepository";
import ProductMongoRepository from "./repositories/ProductMongoRepository";

export default class ProductsController {
    private productsRepository: IProductRepository;
    private uploadService: UploadService;
    private productsTransformer: ProductTransformer;
    constructor() {
        this.productsRepository = new ProductMongoRepository();
        this.uploadService = new UploadService();
        this.productsTransformer = new ProductTransformer();
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }

    public index = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const allProducts = await this.productsRepository.findMany({});
        res.status(200).json(this.productsTransformer.collection(allProducts));
    })

    public create = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const newProductParams = {
            title: req.body.title,
            price: req.body.price,
            discountedPrice: req.body.discountedPrice,
            category: req.body.category,
            attributes: JSON.parse(req.body.attributes),
            variations: JSON.parse(req.body.product_variations),
            priceVariations: JSON.parse(req.body.price_variations),
            stock: req.body.stock,
        };

        const newProduct = await this.productsRepository.create(newProductParams);
        if (req.files) {
            const thumbnail: UploadedFile = req.files.thumbnail as UploadedFile;
            const galleryFiles: UploadedFile[] = req.files["gallery[]"] as UploadedFile[];
            const thumbnailName: string = await this.uploadService.upload(thumbnail);
            const gallery: string[] = await this.uploadService.uploadMany(galleryFiles);
            await this.productsRepository.updateOne(
                { _id: newProduct._id },
                {
                    thumbnail: thumbnailName,
                    gallery,
                }
            );
        }
        res.status(201).json(newProduct);
    });
}
