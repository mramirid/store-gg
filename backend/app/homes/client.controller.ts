import type express from "express";
import { StatusCodes } from "http-status-codes";
import type mongoose from "mongoose";
import type { CategoryDoc } from "../categories/model";
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
      .select({ name: 1, category: 1, imageName: 1 })
      .limit(5)
      .populate("category", "name");
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({ vouchers });
}

const clientHomeController = Object.freeze({ getHomepageData });
export default clientHomeController;
