import { Application, Router } from "express";
import RouteEngine from "./router";
import usersRouter from "components/users/UsersRouter";
import productsRouter from "components/product/ProductRouter";
import categoriesRouter from "components/category/CategoryRouter";
import commentsRouter from "components/comments/CommentRouter";
import settingsRouter from "components/settings/SettingRouter";
import shipmentsRouter from "components/shipment/ShipmentRouter";
import paymentsRouter from "components/payment/PaymentRouter";
import ordersRouter from "components/order/OrderRouter";
import couponsRouter from "components/coupon/CouponRouter";

export class RouteService {
    private router: RouteEngine;
    public constructor(private app: Application) {
        this.router = new RouteEngine();
        this.bindRouters();
    }

    public bindRouters() {
        this.router.registerRouter("/api/v1/users", usersRouter);
        this.router.registerRouter("/api/v1/products", productsRouter);
        this.router.registerRouter("/api/v1/categories", categoriesRouter);
        this.router.registerRouter("/api/v1/comments", commentsRouter);
        this.router.registerRouter("/api/v1/settings", settingsRouter);
        this.router.registerRouter("/api/v1/shipments", shipmentsRouter);
        this.router.registerRouter("/api/v1/payments", paymentsRouter);
        this.router.registerRouter("/api/v1/orders", ordersRouter);
        this.router.registerRouter("/api/v1/coupons", couponsRouter);
    }

    public run() {
        this.router.getRouters().forEach((router: Router, route: string) => {
            this.app.use(route, router);
        });
    }
}
