import { Router } from "express";
import controller from "./controller";

const transactionsRouter = Router();

transactionsRouter.get("/", controller.viewTransactions);
transactionsRouter.patch("/:id/accept");
transactionsRouter.patch("/:id/reject");

export default transactionsRouter;
