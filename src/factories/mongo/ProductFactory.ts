import { faker } from "@faker-js/faker";
import ICategory from "components/category/model/ICategory";
import IAttributeGroup from "components/product/model/IAttributeGroup";
import IPriceVariation from "components/product/model/IPriceVariation";
import IProduct from "components/product/model/IProduct";
import IProductAttribute from "components/product/model/IProductAttribute";
import IProductVariation, { IProductVariationItem } from "components/product/model/IProductVariation";
import Product from "components/product/model/Product";
import { create as CreateCategory } from "./CategoryFactory";

faker.setLocale("fa");
const makeProductAttributes = async (count: number = 1) => {
    const attributes: IProductAttribute[] = [];
    for (let i = 1; i <= count; i++) {
        const title = faker.random.words(2);
        attributes.push({
            title,
            slug: faker.helpers.slugify(title),
            value: faker.random.words(2),
            filterable: faker.datatype.boolean(),
            hasPrice: faker.datatype.boolean(),
        });
    }
    return attributes;
};

const makeGroupAttribute = async (count: number = 1) => {
    const attributes: IAttributeGroup[] = [];
    for (let i = 1; i <= count; i++) {
        const attributeItems = await makeProductAttributes(faker.datatype.number(15));
        attributes.push({
            title: faker.random.words(2),
            attributes: attributeItems,
        });
    }
    return attributes;
};

const makeVariationItems = async (count: number = 1) => {
    const variationItems: IProductVariationItem[] = [];
    for (let i = 1; i <= count; i++) {
        variationItems.push({
            title: faker.random.word(),
            value: faker.random.word(),
        });
    }
    return variationItems;
};

const makeVariations = async (count: number = 1) => {
    const variations: IProductVariation[] = [];
    for (let i = 1; i <= count; i++) {
        const items = await makeVariationItems(faker.datatype.number(10));
        variations.push({
            title: faker.random.words(2),
            name: faker.random.word(),
            type: faker.helpers.arrayElement(["color", "size", "material"]),
            items,
        });
    }
    return variations;
};

const makePriceVariationItems = async (count: number = 1, variations: IProductVariation[]) => {
    const variationItems: object[] = [];
    for (let i = 1; i <= count; i++) {
        const variation = faker.helpers.arrayElement(variations);
        if (variation) {
            const item = faker.helpers.arrayElement<IProductVariationItem>(variation.items);
            if (item) {
                variationItems.push({ [variation.name]: item.value });
            }
        }
    }
    return variationItems;
};

const makePriceVariations = async (count: number = 1, variations: IProductVariation[]) => {
    const priceVariations: IPriceVariation[] = [];

    for (let i = 1; i <= count; i++) {
        const items = await makePriceVariationItems(faker.datatype.number(10), variations);
        priceVariations.push({
            price: faker.commerce.price(undefined, undefined, 0) as unknown as number,
            items,
        });
    }
    return priceVariations;
};

const buildProduct = async (category: ICategory, attributes: IAttributeGroup[], variations: IProductVariation[], priceVariations: IPriceVariation[]) => {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(undefined, undefined, 0),
        discountedPrice: faker.commerce.price(0, undefined, 0),
        thumbnail: faker.image.abstract(),
        gallery: [faker.image.abstract()],
        category: category._id,
        attributes,
        variations,
        priceVariations,
        stock: faker.datatype.number(100),
        // purchased_count: faker.datatype.number(100),
        // comments_count: faker.datatype.number(100),
        // total_score: faker.datatype.number({ min: 0, max: 5, precision: 0.01 }),
        // views_count: faker.datatype.number(10000),
    };
};

export async function create(count: number = 1, params?: Partial<IProduct>) {
    const products: IProduct[] = [];
    for (let i = 1; i <= count; i++) {
        // create category
        const categories = await CreateCategory(1);
        const attributes = await makeGroupAttribute(faker.datatype.number(15));
        const variations = await makeVariations(faker.datatype.number(10));
        const priceVariations = await makePriceVariations(faker.datatype.number(5), variations);
        const productParams = await buildProduct(categories[0], attributes, variations, priceVariations);
        const finalParams = { ...productParams, ...params };
        const newProduct = new Product(finalParams);
        await newProduct.save();
        products.push(newProduct);
    }
    return products;
}
