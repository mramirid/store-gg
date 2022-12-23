import { Router } from "express";
import controller from "./client.controller";

const vouchersClientRouter = Router();

vouchersClientRouter.get("/ids", controller.getVoucherIds);
vouchersClientRouter.get("/:id", controller.getVoucher);

export default vouchersClientRouter;
