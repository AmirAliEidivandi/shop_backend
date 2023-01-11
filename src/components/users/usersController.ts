import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../services/CatchAsync";
import User from "./model/User";

export default class UsersController {
    constructor() {
        this.store = this.store.bind(this);
    }
    public index = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const users = await User.find();
        res.status(200).json(users);
    });

    public create = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const newUser = await User.create({
            firstName: "amirali",
            lastName: "eidivandi",
            email: "amirah64887@gmail.com",
            mobile: "09388558227",
        });
        newUser.addresses.push({
            title: "خانه",
            state: "اصفهان",
            city: "اصفهان",
            address: "رهنان، خیابان شریف غربی، کوچه جعفر ترکیان، جنب فروشگاه شریف",
            zipCode: "123456789",
            fullName: "امیرعلی عیدیوندی",
            mobile: "09388558227",
        });

        await newUser.save();
        res.status(201).json(newUser);
    });

    public store = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const value = Math.random();
        if (value > 0.5) {
            throw new Error("thie request cannot be excuted!");
        }
        res.send({
            success: true,
        });
    });
}
