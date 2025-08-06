import express from "express";
import {
  stripeCheckout,
  stripeWebHook,
} from "../controllers/stripeController.js";
const stripeRouter = express.Router();

stripeRouter.post("/checkout", stripeCheckout);
stripeRouter.post("/webhook", stripeWebHook);
export default stripeRouter;
