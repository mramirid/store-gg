import type express from "express";
import createHttpError from "http-errors";
import type mongoose from "mongoose";
import { AlertStatuses, getAlert, setAlert } from "../../utils/alert";
import type { IMember } from "../members/model";
import type { ITransaction } from "./model";
import Transaction from "./model";

export default {
  viewTransactions,
  acceptTrancation,
  rejectTransaction,
};

type TransactionPopulationPaths = Record<
  "member",
  mongoose.MergeType<ITransaction["member"], Record<"current", IMember>>
>;

type PopulatedTransaction = mongoose.MergeType<
  ITransaction,
  TransactionPopulationPaths
>;

async function viewTransactions(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let transactions: PopulatedTransaction[];

  try {
    transactions =
      await Transaction.find().populate<TransactionPopulationPaths>(
        "member.current"
      );
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

const transaction404Error = new createHttpError.NotFound(
  "Transaction not found."
);

async function acceptTrancation(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const transaction = await Transaction.findById(req.params.id).orFail(
      transaction404Error
    );
    transaction.status = "Accepted";
    await transaction.save();
  } catch (error) {
    next(error);
    return;
  }

  setAlert(req, {
    message: "Transaction accepted",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/transactions");
}

async function rejectTransaction(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const transaction = await Transaction.findById(req.params.id).orFail(
      transaction404Error
    );
    transaction.status = "Rejected";
    await transaction.save();
  } catch (error) {
    next(error);
    return;
  }

  setAlert(req, {
    message: "Transaction rejected",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/transactions");
}
