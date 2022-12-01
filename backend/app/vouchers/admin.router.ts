import { Router } from "express";
import imagesMulter from "../middlewares/images.multer";
import controller from "./admin.controller";

const adminVouchersRouter = Router();

adminVouchersRouter.get("/", controller.viewVouchers);
adminVouchersRouter.get("/create", controller.viewCreateVoucher);
adminVouchersRouter.post(
  "/",
  imagesMulter.handleUpload("imageName"),
  controller.createVoucher,
  controller.createVoucherErrorHandler
);
adminVouchersRouter.get("/:id/edit", controller.viewEditVoucher);
adminVouchersRouter.patch(
  "/:id",
  imagesMulter.handleUpload("imageName"),
  controller.editVoucher,
  controller.editVoucherErrorHandler
);
adminVouchersRouter.delete("/:id", controller.deleteVoucher);

export default adminVouchersRouter;
