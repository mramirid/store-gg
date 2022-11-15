import _ from "lodash";
import { HydratedDocument, model, Schema, Types } from "mongoose";
import validator from "validator";

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
    required: [true, "Nominal name is required."],
  },
  quantity: {
    type: Number,
    min: [0, "Quantity must be a positive integer."],
    default: 0,
    validate: {
      validator: (v: unknown) => validator.isInt(String(v)),
      message: "Quantity must be an integer.",
    },
  },
  price: {
    type: Schema.Types.Decimal128,
    default: 0,
    validate: {
      validator: (v: unknown) => validator.isFloat(String(v), { min: 0 }),
      message: "Price must be a positive float.",
    },
    transform: (v: Types.Decimal128) => _.toNumber(v),
  },
});

const Nominal = model("Nominal", nominalSchema);
export default Nominal;
