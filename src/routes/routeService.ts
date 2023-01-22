import { Application, Router } from "express";
import RouteEngine from "./router";
// frontend
import userFrontRouter from '../components/users/frontend/Router';
import productFrontRouter from '../components/product/frontend/Router';
import orderFrontRouter from '../components/order/frontend/Router';
import paymentFrontRouter from '../components/payment/frontend/Router';
import couponFrontRouter from '../components/coupon/frontend/Router';
import categoryFrontRouter from '../components/category/frontend/Router';
import homeRouter from '../components/home/Router';
import purchaseRouter from '../components/purchase/Router';
import commentsRouter from "../components/comments/CommentRouter";
import settingsRouter from "../components/settings/SettingRouter";
import shipmentsRouter from "../components/shipment/ShipmentRouter";

// admin
import productAdminRouter from "../components/product/admin/ProductRouter";
import couponAdminRouter from "../components/coupon/admin/CouponRouter";
import userAdminRouter from "../components/users/admin/UsersRouter";
import orderAdminRouter from "../components/order/admin/OrderRouter";
import categoryAdminRouter from "../components/category/admin/CategoryRouter";
import paymentAdminRouter from "../components/payment/admin/PaymentRouter";

export class RouteService {
    private router: RouteEngine;
    public constructor(private app: Application) {
        this.router = new RouteEngine();
        this.bindRouters();
    }

    public bindRouters() {
        // admin
        this.router.registerRouter("/api/v1/admin/users", userAdminRouter);
        this.router.registerRouter("/api/v1/admin/products", productAdminRouter);
        this.router.registerRouter("/api/v1/admin/categories", categoryAdminRouter);
        this.router.registerRouter("/api/v1/admin/payments", paymentAdminRouter);
        this.router.registerRouter("/api/v1/admin/orders", orderAdminRouter);
        this.router.registerRouter("/api/v1/admin/coupons", couponAdminRouter);

        // frontend
        this.router.registerRouter('/api/v1/users', userFrontRouter);
        this.router.registerRouter('/api/v1/products', productFrontRouter);
        this.router.registerRouter('/api/v1/categories', categoryFrontRouter);
        this.router.registerRouter('/api/v1/coupons', couponFrontRouter);
        this.router.registerRouter('/api/v1/payments', paymentFrontRouter);
        this.router.registerRouter('/api/v1/orders', orderFrontRouter);
        this.router.registerRouter('/api/v1/home', homeRouter);
        this.router.registerRouter('/api/v1/purchase', purchaseRouter);
        this.router.registerRouter("/api/v1/comments", commentsRouter);
        this.router.registerRouter("/api/v1/shipments", shipmentsRouter);
        this.router.registerRouter("/api/v1/settings", settingsRouter);
    }

    public run() {
        this.router.getRouters().forEach((router: Router, route: string) => {
            this.app.use(route, router);
        });
    }
}
