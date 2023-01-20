import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../services/CatchAsync";
import IShipmentRepository from "./repositories/IShipmentRepository";
import ShipmentMongoRepository from "./repositories/ShipmentMongoRepository";
import ShipmentTransformer from "./ShipmentTransformer";

export default class ShipmentsController {
    private readonly shipmentRepository: IShipmentRepository;
    private readonly shipmentTransformer: ShipmentTransformer;
    constructor() {
        this.shipmentRepository = new ShipmentMongoRepository();
        this.shipmentTransformer = new ShipmentTransformer();
    }

    public index = catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const perPage = 10;
        const page = req.query.page || 1;
        const offset = ((page as number) - 1) * perPage;
        const shipments = await this.shipmentRepository.findMany({}, ['employee', 'order'], {
            perPage,
            offset,
        });
        const totalShipments = await this.shipmentRepository.findMany({});
        const transformedShipments = this.shipmentTransformer.collection(shipments);

        res.status(200).json({
            data: transformedShipments,
            _metadata: {
                page,
                perPage,
                totalPages: Math.ceil(totalShipments.length / perPage),
                totalItems: totalShipments.length,
            },
        });
    });
}
