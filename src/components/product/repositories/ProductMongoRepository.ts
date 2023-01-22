import { FilterQuery, Types } from "mongoose";
import Product from "../model/Product";
import IProduct from "../model/IProduct";
import ProductStatus from "../model/ProductStatus";
import IProductRepository from "./IProductRepository";
import IPagination from "../../contracts/IPagination";
import ObjectInterface from "../../contracts/ObjectInterface";

export default class ProductMongoRepository implements IProductRepository {
    public async findByStatus(status: ProductStatus): Promise<IProduct[]> {
        return Product.find({ status });
    }

    public async findOne(ID: string, relations?: string[]): Promise<IProduct | null> {
        const productQuery = Product.findOne({ _id: ID });
        if (relations && relations.length > 0) {
            relations.forEach((relation: string) => {
                productQuery.populate(relation);
            });
        }
        return productQuery.exec();
    }

    public async findMany(params: ObjectInterface, relations?: string[], pagination?: IPagination, sort?: any): Promise<IProduct[]> {
        const productQueryParams: ObjectInterface = { ...params };
        if (params.category) {
            const objectID = Types.ObjectId;
            productQueryParams.category = new objectID(params.category);
        }
        const productQuery = Product.find(productQueryParams);
        if (sort) {
            productQuery.sort(sort);
        }
        if (pagination) {
            productQuery.limit(pagination.perPage).skip(pagination.offset);
        }
        return productQuery.exec();
    }

    public async create(params: any): Promise<IProduct> {
        const newProduct = new Product({ ...params });
        return newProduct.save();
    }

    public async updateOne(where: FilterQuery<IProduct>, updateData: Partial<IProduct>): Promise<any | boolean> {
        return Product.updateOne(where, updateData);
    }

    public async updateMany(where: FilterQuery<IProduct>, updateData: Partial<IProduct>): Promise<boolean> {
        return true;
    }

    public async deleteOne(ID: string): Promise<boolean> {
        return true;
    }

    public async deleteMany(where: any): Promise<boolean> {
        return true;
    }
}
