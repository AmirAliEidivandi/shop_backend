import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import UploadService from "../../services/UploadService";
import IProductRepository from "./repositories/IProductRepository";
import ProductMongoRepository from "./repositories/ProductMongoRepository";

export default class ProductsController {
    private productsRepository: IProductRepository;
    private uploadService: UploadService;
    constructor() {
        this.productsRepository = new ProductMongoRepository();
        this.uploadService = new UploadService();
        this.index = this.index.bind(this);
        this.create = this.create.bind(this);
    }

    public async index(req: Request, res: Response) {
        const allProducts = await this.productsRepository.findMany({});
        res.send({ allProducts });
    }

    public async create(req: Request, res: Response) {
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
        res.send({ newProduct });
        if (req.files) {
            const thumbnail: UploadedFile = req.files.thumbnail as UploadedFile;
            const galleryFiles: UploadedFile[] = req.files.gallery as UploadedFile[];
            const thumbnailName: string = await this.uploadService.upload(thumbnail);
            const gallery: string[] = await this.uploadService.uploadMany(galleryFiles);
        }
        res.send({ attributes: JSON.parse(req.body.attributes) });
    }
}
