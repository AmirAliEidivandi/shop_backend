import { faker } from "@faker-js/faker";
import IUser from "../../components/users/model/IUser";
import User from "../../components/users/model/User";

export async function create(count: number = 1, params?: Partial<IUser>) {
    const users: IUser[] = [];
    for (let i = 1; i <= count; i++) {
        const defaultUserParams = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            mobile: faker.phone.number(),
            totalOrders: 0,
            wallet: 0,
            addresses: [],
        };
        const userParams = { ...defaultUserParams, ...params };
        const newUser = new User(userParams);
        await newUser.save();
        users.push(newUser);
    }
    return users;
}
