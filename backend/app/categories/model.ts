import { HydratedDocument, model, Query, Schema } from "mongoose";
import type { IVoucher } from "../vouchers/model";

export interface ICategory {
  name: string;
}

export type CategoryDoc = HydratedDocument<ICategory>;

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    trim: true,
    required: [true, "Category name is required"],
  },
});

categorySchema.pre(
  "findOneAndDelete",
  { document: false, query: true },
  async function (this: Query<unknown, unknown>) {
    const { _id } = this.getQuery();
    const numProperties = await model<IVoucher>("Voucher").countDocuments({
      category: _id,
    });
    if (numProperties > 0) {
      throw new Error("The category is being used by some vouchers");
    }
  }
);

const Category = model("Category", categorySchema);
export default Category;
