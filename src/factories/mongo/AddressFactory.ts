import { faker } from "@faker-js/faker";
import IAddress from "components/users/model/IAddress";

faker.setLocale("fa");
export async function make(count: number = 1, params?: Partial<IAddress>) {
    const addresses: IAddress[] = [];
    for (let index = 1; index <= count; index++) {
        const defaultParams = {
            title: faker.helpers.arrayElement(["خانه", "منزل", "اداره", "محل کار", " دفتر", "خانه پدر"]),
            state: faker.address.state(),
            city: faker.address.city(),
            address: faker.address.streetAddress(),
            zipCode: faker.address.zipCode(),
            fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
            mobile: faker.phone.number(),
        };
        addresses.push({ ...defaultParams, ...params });
    }
    return addresses;
}
