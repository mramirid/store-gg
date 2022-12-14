import { Router } from "express";
import controller from "./admin.controller";

const paymentMethodsAdminRouter = Router();

paymentMethodsAdminRouter.get("/", controller.viewPaymentMethods);
paymentMethodsAdminRouter.get("/create", controller.viewCreatePaymentMethod);
paymentMethodsAdminRouter.post("/", controller.createPaymentMethod);
paymentMethodsAdminRouter.get("/:id/edit", controller.viewEditPaymentMethod);
paymentMethodsAdminRouter.patch("/:id", controller.editPaymentMethod);
paymentMethodsAdminRouter.delete("/:id", controller.deletePaymentMethod);

export default paymentMethodsAdminRouter;
