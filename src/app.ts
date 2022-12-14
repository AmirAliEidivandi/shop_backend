import * as express from "express";
import { Application } from "express";
import { RouteService } from "./routes/routeService";
import boot from "./boot";
export class App {
    public app: Application;
    private router: RouteService;

    constructor(public port: number) {
        this.app = express();
        this.router = new RouteService(this.app);
    }

    public start(): void {
        boot(this.app);
        this.router.run();
        this.app.listen(this.port, () => {
            console.log(`app is running on port ${this.port}`);
        });
    }
}
