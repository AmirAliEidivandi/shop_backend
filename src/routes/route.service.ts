import { Application, Router } from "express";
import usersRouter from "../components/users/usersRoutes";
import productsRouter from "../components/product/productsRoutes";
import RouteEngine from "./router";

export class RouteService {
    private router: RouteEngine;
    public constructor(private app: Application) {
        app;
        this.router = new RouteEngine();
        this.bindRouters();
    }

    public bindRouters() {
        this.router.registerRouter("/api/v1/users", usersRouter);
        this.router.registerRouter("/api/v1/products", productsRouter);
    }

    public run() {
        this.router.getRouters().forEach((router: Router, route: string) => {
            this.app.use(route, router);
        });
    }
}
