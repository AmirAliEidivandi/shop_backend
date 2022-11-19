import Handler from "./handler";

abstract class AbstractHandler implements Handler {
    private nextHandler: Handler;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public process(request: object): object {
        if (this.nextHandler) {
            return this.nextHandler.process(request);
        }
        return {}
    }
}
