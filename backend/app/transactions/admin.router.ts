import { Router } from "express";
import controller from "./admin.controller";

const transactionsAdminRouter = Router();

transactionsAdminRouter.get("/", controller.viewTransactions);
transactionsAdminRouter.patch("/:id/accept", controller.acceptTrancation);
transactionsAdminRouter.patch("/:id/reject", controller.rejectTransaction);

export default transactionsAdminRouter;
