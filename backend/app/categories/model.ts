import { HydratedDocument, model, Schema } from "mongoose";

export interface ICategory {
  name: string;
}

export type CategoryDoc = HydratedDocument<ICategory>;

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    trim: true,
    required: [true, "The category name is required"],
  },
});

const Category = model("Category", categorySchema);
export default Category;
