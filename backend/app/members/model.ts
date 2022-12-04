import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import _ from "lodash";
import {
  HydratedDocument,
  isValidObjectId,
  Model,
  model,
  Schema,
  Types,
} from "mongoose";
import validator from "validator";
import Category from "../categories/model";

export interface IMember {
  fullName: string;
  email: string;
  password: string;
  favoriteCategory: Types.ObjectId;
  avatarName?: string;
  phoneNumber?: string;
}

interface IMemberMethods {
  verifyPassword: (password: string) => Promise<boolean>;
}

export type MemberDoc = HydratedDocument<IMember, IMemberMethods>;

const memberSchema = new Schema<
  IMember,
  Model<IMember, Record<string, never>, IMemberMethods>,
  IMemberMethods
>(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      validate: [
        {
          validator: (v: unknown) => validator.isEmail(String(v)),
          message: "Email is not valid",
        },
        {
          validator: async (v: unknown) => {
            const emailExists = await model<Schema<IMember>>("Member").exists({
              email: v,
            });
            return _.isNull(emailExists);
          },
          message: "Email is already in use",
        },
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    favoriteCategory: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: [true, "Favorite category is required"],
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
    avatarName: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate: {
        validator: (v: unknown) => validator.isMobilePhone(String(v), "id-ID"),
        message: "Enter a valid mobile phone number",
      },
    },
  },
  { timestamps: true }
);

memberSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

memberSchema.methods.verifyPassword = function (this: MemberDoc, password) {
  return bcrypt.compare(password, this.password);
};

const Member = model("Member", memberSchema);
export default Member;
