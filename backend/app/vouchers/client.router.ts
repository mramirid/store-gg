import { Router } from "express";
import { ensureMemberAuthenticated } from "../members/middleware";
import controller from "./client.controller";

const vouchersClientRouter = Router();

vouchersClientRouter.get("/ids", controller.getVoucherIds);
vouchersClientRouter.get("/:id", controller.getVoucher);
vouchersClientRouter.post(
  "/:id/checkout",
  ensureMemberAuthenticated,
  controller.checkout
);

export default vouchersClientRouter;
