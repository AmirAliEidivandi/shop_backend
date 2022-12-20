import DateService from "../../services/DateService";
import ITransformer from "../contracts/ITransformer";
import IProduct from "./model/IProduct";

export default class ProductTransformer implements ITransformer<IProduct> {
    private readonly dateService: DateService;
    constructor() {
        this.dateService = new DateService();
    }

    public transform(item: IProduct) {
        return {
            id: item._id,
            title: item.title,
            thumbnail: item.thumbnailUrl,
            price: item.price,
            discountedPrice: item.discountedPrice,
            createdAt: this.dateService.toPersian(item.createdAt.toUTCString()),
            updatedAt: this.dateService.toPersian(item.updatedAt.toUTCString()),
            gallery: item.galleryUrl,
            status: item.status,
            stock: item.stock,
        };
    }

    public collection(items: IProduct[]) {
        return items?.map((item: IProduct) => this.transform(item));
    }
}
