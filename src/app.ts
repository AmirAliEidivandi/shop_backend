import * as express from "express";
import { Application } from "express";
import { RouteService } from "./routes/routeService";
import StartMiddlewares from "./middlewares/";
import boot from "./boot";
export default class App {
    private readonly app: Application;
    private readonly router: RouteService;
    constructor(private readonly port: number) {
        this.app = express();
        this.router = new RouteService(this.app);
    }

    public start(): void {
        boot(this.app);
        this.router.run();
        StartMiddlewares(this.app);
        this.app.listen(this.port, () => {
            console.log(`app instance is running on port: ${this.port}`);
        });
    }
}
