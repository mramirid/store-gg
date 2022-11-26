import createHttpError from "http-errors";
import _ from "lodash";
import {
  HydratedDocument,
  isValidObjectId,
  Model,
  model,
  Schema,
  Types,
} from "mongoose";
import validator from "validator";
import type { IBank } from "../banks/model";
import Category, { ICategory } from "../categories/model";
import Member from "../members/model";
import type { INominal } from "../nominals/model";
import type { IPaymentMethod } from "../payment-methods/model";
import type { IVoucher } from "../vouchers/model";

export interface ITransaction {
  voucher: Pick<IVoucher, "name" | "imageName">;
  category: Pick<ICategory, "name"> & { current: Types.ObjectId };
  nominal: Pick<INominal, "quantity" | "price"> & { name: string };
  paymentMethod: IPaymentMethod["name"];
  targetBank: Pick<IBank, "holderName" | "holderNumbers"> & { name: string };
  taxRate: number;
  member: {
    current: Types.ObjectId;
    bankAccountName: string;
    gameId: string;
  };
  status: "Accepted" | "Rejected" | "Pending";
}

interface ITransactionVirtuals {
  totalPrice: number;
}

export type TransactionDoc = HydratedDocument<
  ITransaction,
  Record<string, never>,
  ITransactionVirtuals
>;

type TransactionModel = Model<
  ITransaction,
  Record<string, never>,
  Record<string, never>,
  ITransactionVirtuals
>;

const transactionSchema = new Schema<
  ITransaction,
  TransactionModel,
  Record<string, never>,
  Record<string, never>,
  ITransactionVirtuals
>(
  {
    voucher: {
      name: {
        type: String,
        trim: true,
        required: [true, "Voucher name is required"],
      },
      imageName: {
        type: String,
        trim: true,
        required: [true, "Please provide an image for the voucher"],
      },
    },
    category: {
      current: {
        type: Schema.Types.ObjectId,
        ref: Category,
        required: [true, "Category id is required"],
        index: true,
        validate: [
          {
            validator: (v: unknown) => isValidObjectId(v),
            message: "Invalid category id",
          },
          {
            validator: (v: unknown) =>
              Category.findById(v).orFail(
                new createHttpError.NotFound("Category not found")
              ),
          },
        ],
      },
      name: {
        type: String,
        trim: true,
        required: [true, "Category name is required"],
      },
    },
    nominal: {
      name: {
        type: String,
        trim: true,
        required: [true, "Nominal name is required"],
      },
      quantity: {
        type: Number,
        required: [true, "Nominal quantity is required"],
        validate: {
          validator: (v: unknown) => validator.isInt(String(v), { min: 0 }),
          message: "Nominal quantity must be a positive integer",
        },
      },
      price: {
        type: Schema.Types.Decimal128,
        required: [true, "Nominal price is required"],
        validate: {
          validator: (v: unknown) => validator.isFloat(String(v), { min: 0 }),
          message: "Nominal price must be a positive float",
        },
        transform: (v: Types.Decimal128) => _.toNumber(v),
      },
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: [true, "Payment method is required"],
    },
    targetBank: {
      name: {
        type: String,
        trim: true,
        required: [true, "Bank name is required"],
      },
      holderName: {
        type: String,
        required: [true, "Bank holder name is required"],
        trim: true,
      },
      holderNumbers: {
        type: String,
        required: [true, "Bank holder numbers is required"],
        trim: true,
        validate: {
          validator: (v: unknown) =>
            validator.isInt(String(v), { allow_leading_zeroes: true, min: 0 }),
          message: "Holder numbers must be integers only",
        },
      },
    },
    taxRate: {
      type: Number,
      default: 0,
      validate: {
        validator: (v: unknown) => validator.isFloat(String(v), { min: 0 }),
        message: "Tax rate must be a positive float",
      },
    },
    member: {
      current: {
        type: Schema.Types.ObjectId,
        ref: Member,
        required: [true, "Member id is required"],
        index: true,
        validate: [
          {
            validator: (v: unknown) => isValidObjectId(v),
            message: "Invalid member id",
          },
          {
            validator: (v: unknown) =>
              Member.findById(v).orFail(
                new createHttpError.NotFound("Member not found")
              ),
          },
        ],
      },
      bankAccountName: {
        type: String,
        required: [true, "Member full name is required"],
        trim: true,
      },
      gameId: {
        type: String,
        required: [true, "Member game id is required"],
        trim: true,
      },
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Accepted", "Rejected", "Pending"],
    },
  },
  {
    timestamps: true,
    virtuals: {
      totalPrice: {
        get() {
          const subTotal = _.toNumber(this.nominal.price);
          const totalPrice = subTotal * this.taxRate + subTotal;
          return totalPrice;
        },
      },
    },
  }
);

const Transaction = model("Transaction", transactionSchema);
export default Transaction;
