import { HydratedDocument, model, Schema } from "mongoose";

export interface ICategory {
  name: string;
}

export type CategoryDoc = HydratedDocument<ICategory>;

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
});

const Category = model("Category", categorySchema);
export default Category;
