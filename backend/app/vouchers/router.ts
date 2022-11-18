import { Router } from "express";
import controller from "./controller";

const vouchersRouter = Router();

vouchersRouter.get("/", controller.viewVouchers);
vouchersRouter.get("/create", controller.viewCreateVoucher);
vouchersRouter.post(
  "/",
  controller.createVoucher,
  controller.createVoucherErrorHandler
);
vouchersRouter.get("/:id/edit", controller.viewEditVoucher);
vouchersRouter.patch(
  "/:id",
  controller.editVoucher,
  controller.editVoucherErrorHandler
);
// vouchersRouter.delete("/:id", controller.deleteVoucher);

export default vouchersRouter;
