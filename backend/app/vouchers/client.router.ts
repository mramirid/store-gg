import { Router } from "express";
import memberMiddleware from "../members/middleware";
import controller from "./client.controller";

const clientVouchersRouter = Router();

clientVouchersRouter.get("/:id", controller.getVoucher);
clientVouchersRouter.post(
  "/:id/checkout",
  memberMiddleware.ensureAuthenticated,
  controller.checkout
);

export default clientVouchersRouter;
