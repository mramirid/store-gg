import { Router } from "express";
import controller from "./controller";

const transactionsRouter = Router();

transactionsRouter.get("/", controller.viewTransactions);
transactionsRouter.patch("/:id/accept", controller.acceptTrancation);
transactionsRouter.patch("/:id/reject", controller.rejectTransaction);

export default transactionsRouter;
