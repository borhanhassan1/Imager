import express from "express";
import {
  stripeCheckout,
  stripeWebHook,
} from "../controllers/stripeController.js";
import userAuth from "../middlewares/auth.js";
const stripeRouter = express.Router();

stripeRouter.post("/checkout", userAuth, stripeCheckout);
stripeRouter.post("/webhook", stripeWebHook);
export default stripeRouter;
