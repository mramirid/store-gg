import type express from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import mongoose, { MergeType } from "mongoose";
import { CustomValidationError } from "../../lib/error";
import type { BankDoc } from "../banks/model";
import Bank from "../banks/model";
import type { CategoryDoc } from "../categories/model";
import type { MemberDoc } from "../members/model";
import type { NominalDoc } from "../nominals/model";
import Nominal from "../nominals/model";
import type { PaymentMethodDoc } from "../payment-methods/model";
import PaymentMethod from "../payment-methods/model";
import Transaction from "../transactions/model";
import Voucher, { VoucherDoc } from "./model";

export default { getVoucherIds, getVoucher, checkout };

const voucher404Error = new createHttpError.NotFound("Voucher not found");

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
      .orFail(voucher404Error)
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

type CheckoutReqBody = {
  nominalId: string;
  paymentMethodId: string;
  bankId: string;
  member: {
    bankAccountName: string;
    gameId: string;
  };
};

async function checkout(
  req: express.Request<{ id: string }, unknown, CheckoutReqBody>,
  res: express.Response,
  next: express.NextFunction
) {
  type PopulatedVoucherDoc = MergeType<VoucherDoc, { category: CategoryDoc }>;
  let voucher: PopulatedVoucherDoc,
    nominal: NominalDoc,
    paymentMethod: PaymentMethodDoc,
    bank: BankDoc;

  try {
    [voucher, nominal, paymentMethod, bank] = await Promise.all([
      Voucher.findById(req.params.id)
        .orFail(voucher404Error)
        .populate<Pick<PopulatedVoucherDoc, "category">>("category"),
      Nominal.findById(req.body.nominalId).orFail(
        new createHttpError.NotFound("Nominal not found")
      ),
      PaymentMethod.findById(req.body.paymentMethodId).orFail(
        new createHttpError.NotFound("Payment method not found")
      ),
      Bank.findById(req.body.bankId).orFail(
        new createHttpError.NotFound("Bank not found")
      ),
    ]);
  } catch (error) {
    next(error);
    return;
  }

  try {
    await Transaction.create({
      voucher: {
        name: voucher.name,
        imageName: voucher.imageName,
      },
      category: {
        current: voucher.category.id,
        name: voucher.category.name,
      },
      nominal: {
        name: nominal.name,
        price: nominal.price,
        quantity: nominal.quantity,
      },
      paymentMethod: paymentMethod.name,
      targetBank: {
        name: bank.name,
        holderName: bank.holderName,
        holderNumbers: bank.holderNumbers,
      },
      taxRate: 10 / 100,
      member: {
        current: (req.user as MemberDoc).id,
        bankAccountName: req.body.member.bankAccountName,
        gameId: req.body.member.gameId,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = new CustomValidationError(error);
      validationError.status = StatusCodes.UNPROCESSABLE_ENTITY;
      next(validationError);
    } else {
      next(error);
    }
    return;
  }

  res.status(StatusCodes.CREATED).json({ message: "Checkout success" });
}
