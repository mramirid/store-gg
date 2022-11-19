import { Router } from "express";
import controller from "./controller";

const paymentMethodsRouter = Router();

paymentMethodsRouter.get("/", controller.viewPaymentMethods);
paymentMethodsRouter.get("/create", controller.viewCreatePaymentMethod);
paymentMethodsRouter.post("/", controller.createPaymentMethod);
paymentMethodsRouter.get("/:id/edit", controller.viewEditPaymentMethod);
paymentMethodsRouter.patch("/:id", controller.editPaymentMethod);
paymentMethodsRouter.delete("/:id", controller.deletePaymentMethod);

export default paymentMethodsRouter;
