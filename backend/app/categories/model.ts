import createHttpError from "http-errors";
import _ from "lodash";
import {
  HydratedDocumentFromSchema,
  InferSchemaType,
  model,
  Schema,
} from "mongoose";
import type { TVoucher } from "../vouchers/model";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Category name is required"],
    },
  },
  { timestamps: true }
);

categorySchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function () {
    const { _id } = this.getQuery();

    const categoryUsed = await model<Schema<TVoucher>>("Voucher").exists({
      category: _id,
    });

    if (_.isObject(categoryUsed)) {
      throw new createHttpError.Conflict(
        "The category is being used by some vouchers"
      );
    }
  }
);

export type TCategory = InferSchemaType<typeof categorySchema>;
export type CategoryDoc = HydratedDocumentFromSchema<typeof categorySchema>;

const Category = model("Category", categorySchema);
export default Category;
