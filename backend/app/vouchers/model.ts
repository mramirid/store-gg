import createHttpError from "http-errors";
import _ from "lodash";
import {
  HydratedDocumentFromSchema,
  InferSchemaType,
  isValidObjectId,
  model,
  Schema,
} from "mongoose";
import Category from "../categories/model";
import Nominal from "../nominals/model";

const voucherSchema = new Schema(
  {
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
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: [true, "Voucher category is required"],
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
    nominals: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: Nominal,
          required: true,
          index: true,
          validate: [
            {
              validator: (v: unknown) => isValidObjectId(v),
              message: "Invalid nominal id",
            },
            {
              validator: (v: unknown) =>
                Nominal.findById(v).orFail(
                  new createHttpError.NotFound("Nominal not found")
                ),
            },
          ],
        },
      ],
      required: [true, "Nominals are reqired"],
      validate: {
        validator: (v: unknown) => !_.isEmpty(v),
        message: "Nominals cannot be empty",
      },
    },
  },
  { timestamps: true }
);

export type TVoucher = InferSchemaType<typeof voucherSchema>;
export type VoucherDoc = HydratedDocumentFromSchema<typeof voucherSchema>;

const Voucher = model("Voucher", voucherSchema);
export default Voucher;
