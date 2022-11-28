import bcrypt from "bcryptjs";
import _ from "lodash";
import { HydratedDocument, Model, model, Schema } from "mongoose";
import validator from "validator";

export interface IAdmin {
  fullName: string;
  email: string;
  password: string;
}

interface IAdminMethods {
  verifyPassword: (password: string) => Promise<boolean>;
}

export type AdminDoc = HydratedDocument<IAdmin, IAdminMethods>;

const adminSchema = new Schema<IAdmin, Model<IAdmin>, IAdminMethods>(
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
            const emailExists = await model<Schema<IAdmin>>("Admin").exists({
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
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

adminSchema.methods.verifyPassword = function (this: AdminDoc, password) {
  return bcrypt.compare(password, this.password);
};

const Admin = model("Admin", adminSchema);
export default Admin;
