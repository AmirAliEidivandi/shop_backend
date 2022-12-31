import { Application, NextFunction, Request, Response } from "express";
import Exception from "src/components/exceptions/Exeption";

export default function ExceptionHandler(app: Application) {
    app.use((error: Exception, req: Request, res: Response, next: NextFunction) => {
        res.status(error.status).json({
            status: error.status,
            code: error.name,
            message: error.message,
        });
    });
}
