import { Request, Response } from "express";
import User from "./model/User";

class UsersController {
    constructor() {}

    public index(req: Request, res: Response) {
        res.send({ allUsers: [] });
    }

    public async create(req: Request, res: Response) {
        const newUser = await User.create({
            first_name: "amirali",
            last_name: "eidivandi",
            email: "amirah64887@gmail.com",
            mobile: "09388558227",
        });

        res.status(201).json(newUser);
    }
}

export default UsersController;
