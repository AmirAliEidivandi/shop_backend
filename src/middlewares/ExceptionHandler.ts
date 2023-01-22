import { Application, NextFunction, Request, Response } from "express";
import Exception from "../components/exceptions/Exception";

export default function ExceptionHandler(app: Application) {
    app.use((error: Exception, req: Request, res: Response, next: NextFunction) => {
        const statusCode = error.status || 500;
        res.status(statusCode).json({
            status: statusCode,
            code: error.name,
            message: error.message,
        });
    });
}
