import bcrypt from "bcryptjs";
import _ from "lodash";
import { HydratedDocument, model, Schema } from "mongoose";
import validator from "validator";

export interface IMember {
  fullName: string;
  email: string;
  password: string;
  avatarName?: string;
  phoneNumber: string;
}

export type MemberDoc = HydratedDocument<IMember>;

const memberSchema = new Schema<IMember>(
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
    avatarName: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: (v: unknown) => validator.isMobilePhone(String(v), "id-ID"),
        message: "Enter a valid mobile phone number",
      },
    },
  },
  { timestamps: true }
);

memberSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const Member = model("Member", memberSchema);
export default Member;
