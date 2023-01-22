export default class Exception extends Error {
    readonly name: string;
    constructor(readonly status: number, readonly message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}
