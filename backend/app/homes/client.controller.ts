import type express from "express";
import { StatusCodes } from "http-status-codes";
import type mongoose from "mongoose";
import type { FilterQuery } from "mongoose";
import type { CategoryDoc } from "../categories/model";
import type { MemberDoc } from "../members/model";
import Transaction, {
  TransactionDoc,
  TTransaction,
} from "../transactions/model";
import type { VoucherDoc } from "../vouchers/model";
import Voucher from "../vouchers/model";

type PopulatedVoucherDoc = mongoose.MergeType<
  VoucherDoc,
  Record<"category", Pick<CategoryDoc, "_id" | "name">>
>;

async function getHomepageData(
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let vouchers: PopulatedVoucherDoc[];

  try {
    vouchers = await Voucher.find()
      .select("name category imageName")
      .limit(5)
      .populate("category", "name");
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({ vouchers });
}

async function getDashboardOverviewData(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const filterQuery: FilterQuery<TTransaction> = {
    "member.current": (req.user as MemberDoc)._id,
  };

  let topUpCategories: unknown, latestTransactions: TransactionDoc[];

  const calculateTotalPrice: mongoose.ArithmeticExpressionOperator = {
    $add: [{ $multiply: ["$nominal.price", "$taxRate"] }, "$nominal.price"],
  };

  try {
    [topUpCategories, latestTransactions] = await Promise.all([
      Transaction.aggregate()
        .match(filterQuery)
        .addFields({
          totalPrice: { $toDouble: calculateTotalPrice },
        })
        .group({
          _id: "$category.current",
          name: { $first: "$category.name" },
          totalSpent: { $sum: calculateTotalPrice },
        })
        .sort({
          totalSpent: -1,
        })
        .project({
          name: 1,
          totalSpent: { $toDouble: "$totalSpent" },
        }),
      Transaction.aggregate()
        .match(filterQuery)
        .sort("-updatedAt")
        .addFields({ totalPrice: { $toDouble: calculateTotalPrice } })
        .limit(5),
    ]);
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({ topUpCategories, latestTransactions });
}

export default { getHomepageData, getDashboardOverviewData };
