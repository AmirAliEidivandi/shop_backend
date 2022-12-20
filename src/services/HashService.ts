import { randomBytes } from "crypto";
import { v4 as uuid } from "uuid";

export const randomHash = (length = 20) => {
    return randomBytes(length).toString("hex");
};

export const hashFromUUID = (): string => {
    return uuid();
};
