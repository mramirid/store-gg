import type express from "express";
import { StatusCodes } from "http-status-codes";
import type { FilterQuery } from "mongoose";
import type { MemberDoc } from "../members/model";
import Transaction, { TransactionDoc, TTransaction } from "./model";

export default { getTransactions };

async function getTransactions(
  req: express.Request<
    unknown,
    unknown,
    unknown,
    Record<"status", TTransaction["status"] | undefined>
  >,
  res: express.Response,
  next: express.NextFunction
) {
  let transactions: TransactionDoc[],
    totalSpentResult: Record<"value", number> | undefined;

  const filter: FilterQuery<TTransaction> = {
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
