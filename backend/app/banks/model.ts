import { HydratedDocument, model, Schema } from "mongoose";
import validator from "validator";

export interface IBank {
  name: string;
  holderName: string;
  holderNumbers: string;
}

export type BankDoc = HydratedDocument<IBank>;

const bankSchema = new Schema<IBank>({
  name: {
    type: String,
    required: [true, "Bank name is required"],
    trim: true,
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

const Bank = model("Bank", bankSchema);
export default Bank;
