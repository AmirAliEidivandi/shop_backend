import ITransformer from "../../contracts/ITransformer";
import IProduct from "../model/IProduct";

export default class ProductTransformer implements ITransformer<IProduct> {
    public transform(item: IProduct) {
        return {
            id: item._id,
            title: item.title,
            category: item.category,
            thumbnail: item.thumbnail,
            gallery: item.gallery,
            attributes: item.attributes,
            stock: item.stock,
            price: item.price,
            discountedPrice: item.discountedPrice,
            variations: item.variations,
            priceVariations: item.priceVariations,
        };
    }

    public collection(items: IProduct[]) {
        return items?.map((item: IProduct) => this.transform(item));
    }
}
