import type express from "express";
import createHttpError from "http-errors";
import type mongoose from "mongoose";
import { AlertStatuses, getAlert, setAlert } from "../../utils/alert";
import Transaction from "./model";

export default {
  viewTransactions,
  acceptTrancation,
  rejectTransaction,
};

async function viewTransactions(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let transactions: mongoose.Document[];

  try {
    transactions = await Transaction.find().populate("member.current");
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
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      status: { $in: ["verifying", "rejected"] },
    }).orFail(transaction404Error);
    transaction.status = "accepted";
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
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      status: { $in: ["verifying", "accepted"] },
    }).orFail(transaction404Error);
    transaction.status = "rejected";
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
