import type express from "express";
import { getAlert } from "../../utils/alert";
import type { TransactionDoc } from "./model";
import Transaction from "./model";

export default {
  viewTransactions,
};

async function viewTransactions(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let transactions: TransactionDoc[];

  try {
    transactions = await Transaction.find();
  } catch (error) {
    next(error);
    return;
  }

  res.render("admin/transactions", {
    pageTitle: "Transactions",
    alert: getAlert(req),
    transactions,
  });
}
