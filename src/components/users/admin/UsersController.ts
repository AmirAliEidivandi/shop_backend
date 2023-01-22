import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../services/CatchAsync";
import User from "../model/User";
import IUserRepository from "../repositories/IUserRepository";
import UserMongoRepository from "../repositories/UserMongoRepository";
import UserTransformer from "./UserTransformer";

export default class UsersController {
    private readonly userRepository: IUserRepository;
    private readonly userTransformer: UserTransformer;
    constructor() {
        this.userRepository = new UserMongoRepository();
        this.userTransformer = new UserTransformer();
        this.index = this.index.bind(this);
        this.store = this.store.bind(this);
        this.create = this.create.bind(this);
    }
    public index = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const perPage = 10;
        const page = req.query.page || 1;
        const offset = ((page as number) - 1) * perPage;
        const users = await this.userRepository.findMany({}, [], { perPage, offset });
        const totalUsers = await this.userRepository.findMany({});
        const transformedUsers = this.userTransformer.collection(users);
        res.status(200).json({
            data: transformedUsers,
            _metadata: {
                page,
                perPage,
                totalPages: Math.ceil(totalUsers.length / perPage),
                totalItems: totalUsers.length,
            },
        });
    });

    public create = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
        });
        newUser.addresses.push({
            title: req.body.title,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            zipCode: req.body.zipCode,
            fullName: req.body.fullName,
            mobile: req.body.mobile,
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
