import type express from "express";
import { StatusCodes } from "http-status-codes";
import type { FilterQuery } from "mongoose";
import type { MemberDoc } from "../members/model";
import Transaction, { TransactionDoc, TransactionType } from "./model";

export default {
  getTransactions,
};

async function getTransactions(
  req: express.Request<
    unknown,
    unknown,
    unknown,
    Record<"status", TransactionType["status"] | undefined>
  >,
  res: express.Response,
  next: express.NextFunction
) {
  let transactions: TransactionDoc[];
  let totalSpentResult: Record<"value", number> | undefined;

  const filter: FilterQuery<TransactionType> = {
    ...req.query,
    "member.current": (req.user as MemberDoc)._id,
  };

  try {
    [transactions, [totalSpentResult]] = await Promise.all([
      Transaction.find(filter),
      Transaction.aggregate()
        .match(filter)
        .group({
          _id: null,
          value: { $sum: "$nominal.price" },
        })
        .project({
          _id: 0,
          value: { $toDouble: "$value" },
        }),
    ]);
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({
    totalSpent: totalSpentResult?.value ?? 0,
    transactions,
  });
}
