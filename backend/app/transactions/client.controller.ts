import type express from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import type { MergeType } from "mongoose";
import mongoose from "mongoose";
import { CustomValidationError } from "../../lib/error";
import Bank, { type BankDoc } from "../banks/model";
import type { CategoryDoc } from "../categories/model";
import type { MemberDoc } from "../members/model";
import Nominal, { type NominalDoc } from "../nominals/model";
import PaymentMethod, { type PaymentMethodDoc } from "../payment-methods/model";
import Voucher, { type VoucherDoc } from "../vouchers/model";
import Transaction, { TransactionDoc, TTransaction } from "./model";

export default {
  getTransactions,
  getTransaction,
  addTransaction,
  confirmPayment,
};

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

  const calculateTotalPrice: mongoose.ArithmeticExpressionOperator = {
    $add: [{ $multiply: ["$nominal.price", "$taxRate"] }, "$nominal.price"],
  };

  try {
    [result] = await Transaction.aggregate()
      // Query berdasarkan status transaksi & id member pemilik transaksi.
      .match({
        ...req.query,
        "member.current": (req.user as MemberDoc)._id,
      })
      .addFields({
        totalPrice: { $toDouble: calculateTotalPrice },
      })
      // Hitung total spent dengan menjumlahkan total prices dari semua transaksi.
      .group({
        _id: null,
        totalSpent: { $sum: calculateTotalPrice },
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

type AddTransactionReqBody = {
  voucherId: string;
  nominalId: string;
  paymentMethodId: string;
  bankId: string;
  member: {
    bankAccountName: string;
    gameId: string;
  };
};

/** Checkout controller */
async function addTransaction(
  req: express.Request<unknown, unknown, AddTransactionReqBody>,
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
      Voucher.findById(req.body.voucherId)
        .orFail(new createHttpError.NotFound("Voucher not found"))
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

  let createdTransaction: TransactionDoc;
  try {
    createdTransaction = await Transaction.create({
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

  res.status(StatusCodes.CREATED).json({
    message: "Checkout success",
    transactionId: createdTransaction.id,
  });
}

async function confirmPayment(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const transaction = await Transaction.findById(req.params.id).orFail(
      new createHttpError.NotFound("Transaction not found.")
    );

    if (transaction.status !== "paying") {
      throw new createHttpError.Forbidden(
        "Unable to confirm this payment. Payment for this transaction has already been confirmed."
      );
    }

    transaction.status = "verifying";
    await transaction.save();
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({
    message: "Payment has been confirmed. Please wait for admin verification.",
  });
}
