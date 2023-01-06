import IProduct from "../../../components/product/model/IProduct";

export default interface IBasket {
    add(product: IProduct): void;
    remove(product: IProduct): Promise<void>;
    items(): Promise<IProduct[]>;
    count(): Promise<number>;
    clear(): void;
    total(): Promise<number>;
    has(product: IProduct): Promise<boolean>;
}
