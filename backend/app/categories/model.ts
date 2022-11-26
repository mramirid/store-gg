import createHttpError from "http-errors";
import _ from "lodash";
import { HydratedDocument, model, Schema } from "mongoose";
import type { IVoucher } from "../vouchers/model";

export interface ICategory {
  name: string;
}

export type CategoryDoc = HydratedDocument<ICategory>;

const categorySchema = new Schema<ICategory>(
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

    const categoryUsed = await model<Schema<IVoucher>>("Voucher").exists({
      category: _id,
    });

    if (_.isObject(categoryUsed)) {
      throw new createHttpError.Conflict(
        "The category is being used by some vouchers"
      );
    }
  }
);

const Category = model("Category", categorySchema);
export default Category;
