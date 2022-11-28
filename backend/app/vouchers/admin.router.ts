import { Router } from "express";
import controller from "./admin.controller";

const adminVouchersRouter = Router();

adminVouchersRouter.get("/", controller.viewVouchers);
adminVouchersRouter.get("/create", controller.viewCreateVoucher);
adminVouchersRouter.post(
  "/",
  controller.createVoucher,
  controller.createVoucherErrorHandler
);
adminVouchersRouter.get("/:id/edit", controller.viewEditVoucher);
adminVouchersRouter.patch(
  "/:id",
  controller.editVoucher,
  controller.editVoucherErrorHandler
);
adminVouchersRouter.delete("/:id", controller.deleteVoucher);

export default adminVouchersRouter;
