import type express from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import type { MergeType } from "mongoose";
import type { CategoryDoc } from "../categories/model";
import type { NominalDoc } from "../nominals/model";
import Voucher, { VoucherDoc } from "./model";

export default { getVoucherIds, getVoucher };

async function getVoucherIds(
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let result: { voucherIds: string[] } | undefined;

  try {
    [result] = await Voucher.aggregate().group({
      _id: null,
      voucherIds: { $push: "$_id" },
    });
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({ voucherIds: result?.voucherIds ?? [] });
}

async function getVoucher(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  type PopulatedVoucherDoc = MergeType<
    VoucherDoc,
    {
      category: Pick<CategoryDoc, "_id" | "name">;
      nominals: Array<Pick<NominalDoc, "_id" | "name" | "quantity" | "price">>;
    }
  >;
  let voucher: PopulatedVoucherDoc;

  try {
    voucher = await Voucher.findById(req.params.id)
      .orFail(new createHttpError.NotFound("Voucher not found"))
      .select("name category nominals imageName")
      .populate<Pick<PopulatedVoucherDoc, "category">>("category", "name")
      .populate<Pick<PopulatedVoucherDoc, "nominals">>(
        "nominals",
        "name quantity price"
      );
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({ voucher });
}
