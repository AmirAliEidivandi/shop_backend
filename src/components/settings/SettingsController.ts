import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../services/CatchAsync";
import ISettingRepository from "./repositories/ISettingRepository";
import SettingMongoRepository from "./repositories/SettingMongoRepository";
import SettingTransformer from "./SettingTransformer";

export default class SettingsController {
    private readonly settingRepository: ISettingRepository;
    private readonly settingTransformer: SettingTransformer;
    constructor() {
        this.settingRepository = new SettingMongoRepository();
        this.settingTransformer = new SettingTransformer();
        this.index = this.index.bind(this);
        this.store = this.store.bind(this);
    }

    public index = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const perPage = 10;
        const page = req.query.page || 1;
        const offset = ((page as number) - 1) * perPage;
        const settings = await this.settingRepository.findMany({}, [], { perPage, offset });
        const totalSetting = await this.settingRepository.findMany({});
        const settingTransformed = this.settingTransformer.collection(settings);
        res.status(200).json({
            data: settingTransformed,
            _metadata: {
                page,
                perPage,
                totalPages: Math.ceil(totalSetting.length / perPage),
                totalItems: totalSetting.length,
            },
        });
    });

    public store = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const newSetting = await this.settingRepository.create({
            title: req.body.title,
            key: req.body.key,
            value: req.body.value,
            scope: req.body.scope as unknown as number,
            version: req.body.version,
        });
        if (newSetting) {
            res.status(201).json({
                success: true,
                message: "تنظیمات جدید با موفقیت ایجاد شد",
            });
        }
    });
}
