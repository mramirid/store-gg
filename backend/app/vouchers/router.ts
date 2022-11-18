import { Router } from "express";
import controller from "./controller";

const vouchersRouter = Router();

vouchersRouter.get("/", controller.viewVouchers);
vouchersRouter.get("/create", controller.viewCreateVoucher);
vouchersRouter.post("/", controller.createVoucher);
vouchersRouter.get("/:id/edit", controller.viewEditVoucher);
vouchersRouter.patch("/:id", controller.editVoucher);
// vouchersRouter.delete("/:id", controller.deleteVoucher);

export default vouchersRouter;
