import { faker } from "@faker-js/faker";
import IAttribute from "../../components/category/model/IAttribute";
import IAttributeCategory from "../../components/category/model/IAttributeCategory";
import ICategory from "../../components/category/model/ICategory";
import Category from "../../components/category/model/Category";

// faker.setLocale('fa')
function makeAttributes(count: number = 1) {
    const attributes: IAttribute[] = [];
    const title = faker.random.words(2);
    for (let index = 1; index <= count; index++) {
        const params = {
            title,
            slug: faker.helpers.slugify(title),
            filterable: faker.datatype.boolean(),
            hasPrice: faker.datatype.boolean(),
        };
        attributes.push(params);
    }
    return attributes;
}

function makeGroup(count: number = 1) {
    const groups: IAttributeCategory[] = [];
    for (let index = 1; index <= count; index++) {
        const params = {
            title: faker.random.words(),
            attributes: makeAttributes(faker.datatype.number(20)),
        };
        groups.push(params);
    }
    return groups;
}

export async function create(count: number = 1, params?: Partial<ICategory>) {
    const categories: ICategory[] = [];
    for (let index = 1; index <= count; index++) {
        const title = faker.random.words(2);
        const defaultParams = {
            title,
            slug: faker.helpers.slugify(title.toLowerCase()),
            groups: makeGroup(faker.datatype.number(15)),
        };
        const newCategory = new Category({ ...defaultParams, ...params });
        await newCategory.save();
        categories.push(newCategory);
    }
    return categories;
}
