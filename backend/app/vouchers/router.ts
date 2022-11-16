import { Router } from "express";
import imagesMulter from "../middlewares/images.multer";
import controller from "./controller";

const vouchersRouter = Router();

vouchersRouter.get("/", controller.viewVouchers);
vouchersRouter.get("/create", controller.viewCreateVoucher);
vouchersRouter.post(
  "/",
  imagesMulter.handleUpload("image"),
  controller.createVoucher
);
// vouchersRouter.get("/:id/edit", controller.viewEditVoucher);
// vouchersRouter.patch("/:id", controller.editVoucher);
// vouchersRouter.delete("/:id", controller.deleteVoucher);

export default vouchersRouter;
