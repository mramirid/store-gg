import { Router } from "express";
import controller from "./client.controller";

const clientVouchersRouter = Router();

clientVouchersRouter.get("/:id", controller.getVoucher);

export default clientVouchersRouter;
