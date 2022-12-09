import { Router } from "express";
import { ensureMemberAuthenticated } from "../members/middleware";
import controller from "./client.controller";

const transactionsClientRouter = Router();

transactionsClientRouter.get(
  "/",
  ensureMemberAuthenticated,
  controller.getTransactions
);
transactionsClientRouter.get(
  "/:id",
  ensureMemberAuthenticated,
  controller.getTransaction
);

export default transactionsClientRouter;
