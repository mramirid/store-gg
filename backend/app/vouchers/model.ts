import createHttpError from "http-errors";
import _ from "lodash";
import {
  HydratedDocument,
  isValidObjectId,
  model,
  Schema,
  Types,
} from "mongoose";
import Category from "../categories/model";
import Nominal from "../nominals/model";

export interface IVoucher {
  name: string;
  imageName: string;
  category: Types.ObjectId;
  nominals: Types.ObjectId[];
}

export type VoucherDoc = HydratedDocument<IVoucher>;

const voucherSchema = new Schema<IVoucher>({
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
    validate: {
      validator: (v: unknown) => !_.isEmpty(v),
      message: "Nominals cannot be empty",
    },
  },
});

const Voucher = model("Voucher", voucherSchema);
export default Voucher;
