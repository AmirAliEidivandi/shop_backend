import { faker } from "@faker-js/faker";
import IUser from "components/users/model/IUser";
import User from "components/users/model/User";
import { make as makeAddress } from "./AddressFactory";

faker.setLocale("fa");
export async function create(count: number = 1, params?: Partial<IUser>) {
    const users: IUser[] = [];
    for (let index = 1; index <= count; index++) {
        const addresses = await makeAddress();
        const defaultParams = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            mobile: faker.phone.number(),
            totalOrders: 0,
            wallet: 0,
            password: faker.internet.password(30),
            addresses,
        };
        const userParams = { ...defaultParams, ...params };
        const newUser = new User(userParams);
        await newUser.save();
        users.push(newUser);
    }
    return users;
}
