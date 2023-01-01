import Exception from "./Exeption";

export default class NotFoundException extends Exception {
    constructor(message: string) {
        super(404, message);
    }
}
