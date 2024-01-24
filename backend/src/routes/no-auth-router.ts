import { Router } from "express";
import stripeService from "../controllers/user/stripePayment";

// Constants
const noAuthRouter = Router();

noAuthRouter.post("/create-checkout-session", stripeService.stripe);

// Export default
export default noAuthRouter;
