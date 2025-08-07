import express from "express";
import {
  stripeCheckout,
  stripeWebHook,
} from "../controllers/stripeController.js";
import userAuth from "../middlewares/auth.js";
import bodyParser from "body-parser";

const stripeRouter = express.Router();

stripeRouter.post("/checkout",express.json(), userAuth, stripeCheckout);
stripeRouter.post(
  "/webhook",
   express.raw({ type: 'application/json' }),
  stripeWebHook
);
export default stripeRouter;
