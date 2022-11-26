import type express from "express";
import Category from "../categories/model";
import Transaction from "../transactions/model";
import Voucher from "../vouchers/model";

export default { viewHome };

async function viewHome(
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let numCategories: number,
    numVouchers: number,
    numMembers: number,
    numTransactions: number;

  try {
    [numCategories, numVouchers, numMembers, numTransactions] =
      await Promise.all([
        Category.countDocuments(),
        Voucher.countDocuments(),
        Promise.resolve(NaN),
        Transaction.countDocuments(),
      ]);
  } catch (error) {
    next(error);
    return;
  }

  res.render("admin", {
    pageTitle: "Home",
    numCategories,
    numVouchers,
    numMembers,
    numTransactions,
  });
}
