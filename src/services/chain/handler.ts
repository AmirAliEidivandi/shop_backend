export default interface Handler {
    setNext(handler: Handler): Handler;
    process(request: object): object;
}