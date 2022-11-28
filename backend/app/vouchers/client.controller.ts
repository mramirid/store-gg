import type express from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import type { CategoryDoc } from "../categories/model";
import type { NominalDoc } from "../nominals/model";
import Voucher, { VoucherDoc } from "./model";

export default { getVoucher };

type PopulatedVoucherDoc = Omit<VoucherDoc, "category" | "nominals"> & {
  category: Pick<CategoryDoc, "_id" | "name">;
  nominals: Pick<NominalDoc, "_id" | "name" | "quantity" | "price">[];
};

async function getVoucher(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  let voucher: PopulatedVoucherDoc;

  try {
    voucher = await Voucher.findById(req.params.id)
      .orFail(new createHttpError.NotFound("Voucher not found"))
      .select({ name: 1, category: 1, nominals: 1, imageName: 1 })
      .populate("category", "name")
      .populate("nominals", "name quantity price");
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({ voucher });
}
