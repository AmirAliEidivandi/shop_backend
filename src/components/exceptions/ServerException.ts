import Exception from "./Exeption";

export default class ServerException extends Exception {
    constructor(message: string) {
        super(500, message);
    }
}
