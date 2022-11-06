import * as express from "express";
import { Application } from "express";
import Router from "./router";

class App {
    public app: Application;
    private router: Router;

    constructor(public port: number) {
        this.app = express();
        port;
        this.router = new Router(this.app);
        this.router.run();
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log("app is running...");
        });
    }
}

export default App;
