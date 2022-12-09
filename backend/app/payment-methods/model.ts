import createHttpError from "http-errors";
import _ from "lodash";
import {
  HydratedDocumentFromSchema,
  InferSchemaType,
  isValidObjectId,
  model,
  Schema,
} from "mongoose";
import Bank from "../banks/model";

const paymentMethodSchema = new Schema(
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

export type TPaymentMethod = InferSchemaType<typeof paymentMethodSchema>;
export type PaymentMethodDoc = HydratedDocumentFromSchema<
  typeof paymentMethodSchema
>;

const PaymentMethod = model("PaymentMethod", paymentMethodSchema);
export default PaymentMethod;
