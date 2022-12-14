import ProductStatus from "../model/ProductStatus";
import IProductRepository from "./IProductRepository";
import Product from "../model/Product";
import IProduct from "../model/IProduct";

export default class ProductMongoRepository implements IProductRepository {
    public async findByStatus(status: ProductStatus): Promise<IProduct[]> {
        return Product.find({ status });
    }

    public async findOne(ID: string): Promise<IProduct | null> {
        return Product.findById(ID);
    }

    public async findMany(params: any): Promise<IProduct[]> {
        return Product.find(params);
    }

    public async create(params: any): Promise<IProduct> {
        const newProduct = new Product({ ...params });
        return newProduct.save();
    }

    public async updateOne(where: Partial<IProduct>, updateData: Partial<IProduct>): Promise<boolean> {
        return true;
    }
    public async updateMany(where: Partial<IProduct>, updateData: Partial<IProduct>): Promise<boolean> {
        return true;
    }
    
    public async deleteOne(ID: string): Promise<boolean> {
        return true;
    }
    
    public async deleteMany(where: any): Promise<boolean> {
        return true;
    }
    
}
