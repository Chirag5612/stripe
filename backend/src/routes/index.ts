import { Router } from "express";
import noAuthRouter from "./no-auth-router";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/', noAuthRouter);

// Export default.
export default baseRouter;
