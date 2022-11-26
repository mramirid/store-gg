import createHttpError from "http-errors";
import _ from "lodash";
import {
  HydratedDocument,
  isValidObjectId,
  model,
  Schema,
  Types,
} from "mongoose";
import Bank from "../banks/model";

export interface IPaymentMethod {
  name: string;
  banks: Types.ObjectId[];
}

export type PaymentMethodDoc = HydratedDocument<IPaymentMethod>;

const paymentMethodSchema = new Schema<IPaymentMethod>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    banks: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: Bank,
          required: [true, "Bank is required"],
          index: true,
          validate: [
            {
              validator: (v: unknown) => isValidObjectId(v),
              message: "Invalid bank id",
            },
            {
              validator: (v: unknown) =>
                Bank.findById(v).orFail(
                  new createHttpError.NotFound("Bank not found")
                ),
            },
          ],
        },
      ],
      required: [true, "Banks are required"],
      validate: {
        validator: (v: unknown) => !_.isEmpty(v),
        message: "Banks cannot be empty",
      },
    },
  },
  { timestamps: true }
);

const PaymentMethod = model("PaymentMethod", paymentMethodSchema);
export default PaymentMethod;
