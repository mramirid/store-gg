import { Router } from "express";
import controller from "./client.controller";

const paymentMethodsClientRouter = Router();

paymentMethodsClientRouter.get("/", controller.getPaymentMethods);

export default paymentMethodsClientRouter;
