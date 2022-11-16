import * as express from "express";
import { Application } from "express";
import { RouteService } from "./routes/route.service";
export class App {
    public app: Application;
    private router: RouteService;

    constructor(public port: number) {
        this.app = express();
        port;
        this.router = new RouteService(this.app);
    }

    public start(): void {
        this.router.run();
        this.app.listen(this.port, () => {
            console.log("app is running...");
        });
    }
}
