import { Request, Response } from "express";
import User from "./model/User";

export default class UsersController {

    public async index(req: Request, res: Response) {
        const users = await User.find();
        res.send({ users });
    }

    public async create(req: Request, res: Response) {
        const newUser = await User.create({
            first_name: "amirali",
            last_name: "eidivandi",
            email: "amirah64887@gmail.com",
            mobile: "09388558227",
        });
        newUser.addresses.push({
            title: "خانه",
            state: "اصفهان",
            city: "اصفهان",
            address: "رهنان، خیابان شریف غربی، کوچه جعفر ترکیان، جنب فروشگاه شریف",
            zip_code: "123456789",
            full_name: "امیرعلی عیدیوندی",
            mobile: "09388558227",
        });

        await newUser.save();
        res.status(201).json(newUser);
    }
}