import createHttpError from "http-errors";
import _ from "lodash";
import { HydratedDocument, model, Query, Schema, Types } from "mongoose";
import validator from "validator";
import type { IVoucher } from "../vouchers/model";

export const NOMINAL_NAMES = ["Gold", "Diamond", "Jewel"] as const;

export interface INominal {
  name: typeof NOMINAL_NAMES[number];
  quantity: number;
  price: Types.Decimal128;
}

export type NominalDoc = HydratedDocument<INominal>;

const nominalSchema = new Schema<INominal>({
  name: {
    type: String,
    enum: NOMINAL_NAMES,
    required: [true, "Name is required"],
  },
  quantity: {
    type: Number,
    default: 0,
    validate: {
      validator: (v: unknown) => validator.isInt(String(v), { min: 0 }),
      message: "Quantity must be a positive integer",
    },
  },
  price: {
    type: Schema.Types.Decimal128,
    default: 0,
    validate: {
      validator: (v: unknown) => validator.isFloat(String(v), { min: 0 }),
      message: "Price must be a positive float",
    },
    transform: (v: Types.Decimal128) => _.toNumber(v),
  },
});

nominalSchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (this: Query<unknown, unknown>) {
    const { _id } = this.getQuery();

    const nominalUsed = await model<IVoucher>("Voucher").exists({
      nominals: _id,
    });

    if (_.isObject(nominalUsed)) {
      throw new createHttpError.Conflict(
        "The nominal is being used by some vouchers"
      );
    }
  }
);

const Nominal = model("Nominal", nominalSchema);
export default Nominal;
