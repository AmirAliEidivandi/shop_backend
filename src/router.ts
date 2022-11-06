import { Application, Request, Response } from "express";

class Router {
    constructor(private app: Application) {
        app;
    }

    public run(): void {
        this.app.get("/api/v1/users", (req: Request, res: Response) => {
            res.send({ success: true });
        });
    }
}

export default Router;