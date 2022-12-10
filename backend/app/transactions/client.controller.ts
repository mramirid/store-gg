import type express from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import type { MemberDoc } from "../members/model";
import Transaction, { TransactionDoc, TTransaction } from "./model";

export default { getTransactions, getTransaction };

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
  let result:
    | { transactions: TransactionDoc[]; totalSpent: number }
    | undefined;

  try {
    [result] = await Transaction.aggregate()
      // Query berdasarkan status transaksi & id member pemilik transaksi.
      .match({
        ...req.query,
        "member.current": (req.user as MemberDoc)._id,
      })
      // Hitung total spent dengan menjumlahkan total prices dari semua transaksi.
      .group({
        _id: null,
        totalSpent: {
          $sum: {
            $add: [
              { $multiply: ["$nominal.price", "$taxRate"] },
              "$nominal.price",
            ],
          },
        },
        transactions: { $push: "$$ROOT" },
      })
      .project({
        _id: 0,
        totalSpent: { $toDouble: "$totalSpent" },
        transactions: 1,
      });
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({
    transactions: result?.transactions ?? [],
    totalSpent: result?.totalSpent ?? 0,
  });
}

async function getTransaction(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  let transaction: TransactionDoc;

  try {
    transaction = await Transaction.findOne({
      _id: req.params.id,
      "member.current": (req.user as MemberDoc)._id,
    }).orFail(new createHttpError.NotFound("Transaction not found"));
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({
    transaction: {
      ...transaction.toJSON(),
      totalPrice: transaction.getTotalPrice(),
    },
  });
}
