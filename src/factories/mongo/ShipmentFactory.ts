import { faker } from "@faker-js/faker";
import Shipment from "../../components/shipment/model/Shipment";
import IShipment from "../../components/shipment/model/IShipment";
import ShipmentStatus from "../../components/shipment/model/ShipmentStatus";
import { create as createUser } from "./UserFactory";
import { create as createOrder } from "./OrderFactory";

faker.setLocale("fa");
export async function create(count: number = 1, params?: Partial<IShipment>) {
    const shipments: IShipment[] = [];
    for (let index = 1; index <= count; index++) {
        const user = await createUser(1);
        const order = await createOrder(1);
        const defaultParams = {
            employee: user[0]._id,
            order: order[0]._id,
            selectedDateTime: faker.date.future(),
            deliveredAt: faker.date.future(),
            note: faker.helpers.arrayElement(["", faker.lorem.paragraph()]),
            status: faker.helpers.arrayElement([ShipmentStatus.ABSENT, ShipmentStatus.DELIVERED, ShipmentStatus.PENDING, ShipmentStatus.PICKED_UP]),
        };
        const finalParams = { ...defaultParams, ...params };
        const newShipment = new Shipment(finalParams);
        await newShipment.save();
        shipments.push(newShipment);
    }
    return shipments;
}
