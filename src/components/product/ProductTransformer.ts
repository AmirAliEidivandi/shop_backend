import ITransformer from "../contracts/ITransformer";
import IProduct from "./model/IProduct";

export default class ProductTransformer implements ITransformer<IProduct> {
    public transform(item: IProduct) {
        return {
            id: item._id,
            title: item.title,
            thumbnail: item.thumbnail,
            price: item.price,
            discountedPrice: item.discountedPrice,
            create_at: item.createdAt,
            update_at: item.updatedAt,
            gallery: item.gallery,
            status: item.status,
        };
    }

    public collection(items: IProduct[]) {
        return items?.map((item: IProduct) => this.transform(item));
    }
}
