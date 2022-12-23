import { Router } from "express";
import { ensureMemberAuthenticated } from "../members/middleware";
import controller from "./client.controller";

const transactionsClientRouter = Router();

transactionsClientRouter.get(
  "/",
  ensureMemberAuthenticated,
  controller.getTransactions
);
transactionsClientRouter.post(
  "/",
  ensureMemberAuthenticated,
  controller.addTransaction
);
transactionsClientRouter.get(
  "/:id",
  ensureMemberAuthenticated,
  controller.getTransaction
);
transactionsClientRouter.patch(
  "/:id/confirm-payment",
  ensureMemberAuthenticated,
  controller.confirmPayment
);

export default transactionsClientRouter;
