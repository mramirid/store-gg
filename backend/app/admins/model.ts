import bcrypt from "bcryptjs";
import { HydratedDocument, model, Schema } from "mongoose";
import validator from "validator";

export interface IAdmin {
  fullName: string;
  email: string;
  password: string;
}

export type AdminDoc = HydratedDocument<IAdmin>;

const adminSchema = new Schema<IAdmin>(
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
      validate: {
        validator: (v: unknown) => validator.isEmail(String(v)),
        message: "Email is not valid",
      },
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

const Admin = model("Admin", adminSchema);
export default Admin;
