import { Router } from "express";
import controller from "./admin.controller";

const adminTransactionsRouter = Router();

adminTransactionsRouter.get("/", controller.viewTransactions);
adminTransactionsRouter.patch("/:id/accept", controller.acceptTrancation);
adminTransactionsRouter.patch("/:id/reject", controller.rejectTransaction);

export default adminTransactionsRouter;
