import createHttpError from "http-errors";
import { HydratedDocument, model, Query, Schema } from "mongoose";
import validator from "validator";
import type { IPaymentMethod } from "../payment-methods/model";

export const BANK_NAMES = [
  "Bank Syariah Indonesia",
  "Bank BCA Syariah",
  "Bank Muamalat Indonesia",
  "Bank Maybank Syariah Indonesia",
  "Bank Panin Syariah",
  "Bank Bukopin Syariah",
  "Bank Mega Syariah",
  "Bank Victoria Syariah",
  "Bank BTPN Syariah",
  "Bank BJB Syariah",
  "Bank BTN Syariah",
  "Bank Sinarmas Syariah",
  "Bank Aceh Syariah",
  "Bank Jateng Syariah",
  "Bank Kaltim Syariah",
  "Bank Bumiputera Syariah",
] as const;

export interface IBank {
  name: typeof BANK_NAMES[number];
  holderName: string;
  holderNumbers: string;
}

export type BankDoc = HydratedDocument<IBank>;

const bankSchema = new Schema<IBank>({
  name: {
    type: String,
    enum: BANK_NAMES,
    required: [true, "Bank name is required"],
  },
  holderName: {
    type: String,
    required: [true, "Holder name is required"],
    trim: true,
  },
  holderNumbers: {
    type: String,
    required: [true, "Holder numbers is required"],
    trim: true,
    validate: {
      validator: (v: unknown) =>
        validator.isInt(String(v), { allow_leading_zeroes: true, min: 0 }),
      message: "Holder numbers must be integers only",
    },
  },
});

bankSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (this: Query<unknown, unknown>) {
    const { _id } = this.getQuery();

    const numPaymentMethods = await model<IPaymentMethod>(
      "PaymentMethod"
    ).countDocuments({ banks: _id });

    if (numPaymentMethods > 0) {
      throw new createHttpError.Conflict(
        "The bank is being used by some payment methods"
      );
    }
  }
);

const Bank = model("Bank", bankSchema);
export default Bank;
