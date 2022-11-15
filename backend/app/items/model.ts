import _ from "lodash";
import { HydratedDocument, model, Schema, Types } from "mongoose";
import validator from "validator";

export const itemNames = ["gold", "diamond", "jewel"] as const;

export interface IItem {
  name: typeof itemNames[number];
  quantity: number;
  price: Types.Decimal128;
}

export type ItemDoc = HydratedDocument<IItem>;

const itemSchema = new Schema<IItem>({
  name: {
    type: String,
    enum: itemNames,
    required: true,
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
    validate: {
      validator: (v: unknown) => validator.isInt(String(v)),
      message: "Quantity must be an integer",
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

const Item = model("Item", itemSchema);
export default Item;
