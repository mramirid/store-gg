import { Router } from "express";
import imagesMulter from "../middlewares/images.multer";
import controller from "./admin.controller";

const vouchersAdminRouter = Router();

vouchersAdminRouter.get("/", controller.viewVouchers);
vouchersAdminRouter.get("/create", controller.viewCreateVoucher);
vouchersAdminRouter.post(
  "/",
  imagesMulter.handleUpload("imageName"),
  controller.createVoucher,
  controller.createVoucherErrorHandler
);
vouchersAdminRouter.get("/:id/edit", controller.viewEditVoucher);
vouchersAdminRouter.patch(
  "/:id",
  imagesMulter.handleUpload("imageName"),
  controller.editVoucher,
  controller.editVoucherErrorHandler
);
vouchersAdminRouter.delete("/:id", controller.deleteVoucher);

export default vouchersAdminRouter;
