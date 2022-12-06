import { Response, Router } from "express";
import memberMiddleware from "../members/middleware";
import controller from "./client.controller";

const clientVouchersRouter = Router();

clientVouchersRouter.get("/:id", controller.getVoucher);
clientVouchersRouter.get(
  "/:id/checkout",
  memberMiddleware.ensureAuthenticated,
  (_: unknown, res: Response) => {
    res.status(200).json({ message: "Authenticated" });
  }
);

export default clientVouchersRouter;
