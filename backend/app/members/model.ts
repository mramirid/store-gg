import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import _ from "lodash";
import {
  HydratedDocumentFromSchema,
  InferSchemaType,
  isValidObjectId,
  model,
  Schema,
} from "mongoose";
import validator from "validator";
import Category from "../categories/model";

const memberSchema = new Schema(
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
            const emailExists = await model("Member").exists({ email: v });
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
  {
    timestamps: true,
    methods: {
      verifyPassword: function (password: string) {
        return bcrypt.compare(password, this.password);
      },
    },
  }
);

memberSchema.pre("save", async function (next) {
  if (this.isDirectModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export type TMember = InferSchemaType<typeof memberSchema>;
export type MemberDoc = HydratedDocumentFromSchema<typeof memberSchema>;

const Member = model("Member", memberSchema);
export default Member;
