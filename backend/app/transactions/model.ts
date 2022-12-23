import createHttpError from "http-errors";
import _ from "lodash";
import {
  HydratedDocumentFromSchema,
  InferSchemaType,
  isValidObjectId,
  model,
  Schema,
  Types
} from "mongoose";
import validator from "validator";
import Category from "../categories/model";
import Member from "../members/model";

const transactionSchema = new Schema(
  {
    voucher: {
      type: {
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
      required: true,
    },
    category: {
      type: {
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
      required: true,
    },
    nominal: {
      type: {
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
      required: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: [true, "Payment method is required"],
    },
    targetBank: {
      type: {
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
              validator.isInt(String(v), {
                allow_leading_zeroes: true,
                min: 0,
              }),
            message: "Holder numbers must be integers only",
          },
        },
      },
      required: true,
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
      type: {
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
      required: true,
    },
    status: {
      type: String,
      default: "paying",
      enum: ["accepted", "rejected", "verifying", "paying"],
    },
  },
  {
    timestamps: true,
    methods: {
      getTotalPrice: function () {
        const subTotal = _.toNumber(this.nominal.price);
        const totalPrice = subTotal * this.taxRate + subTotal;
        return totalPrice;
      },
    },
  }
);

export type TTransaction = InferSchemaType<typeof transactionSchema>;
export type TransactionDoc = HydratedDocumentFromSchema<
  typeof transactionSchema
>;

const Transaction = model("Transaction", transactionSchema);
export default Transaction;
