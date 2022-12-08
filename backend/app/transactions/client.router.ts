import { Router } from "express";
import membersMiddleware from "../members/middleware";
import controller from "./client.controller";

const clientTransactionsRouter = Router();

clientTransactionsRouter.get(
  "/",
  membersMiddleware.ensureAuthenticated,
  controller.getTransactions
);

export default clientTransactionsRouter;
