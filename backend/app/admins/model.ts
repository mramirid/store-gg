import bcrypt from "bcryptjs";
import _ from "lodash";
import {
  HydratedDocumentFromSchema,
  InferSchemaType,
  model,
  Schema,
} from "mongoose";
import validator from "validator";

const adminSchema = new Schema(
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
            const emailExists = await model("Admin").exists({ email: v });
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
  {
    timestamps: true,
    methods: {
      verifyPassword: function (password: string) {
        return bcrypt.compare(password, this.password);
      },
    },
  }
);

adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export type TAdmin = InferSchemaType<typeof adminSchema>;
export type AdminDoc = HydratedDocumentFromSchema<typeof adminSchema>;

const Admin = model("Admin", adminSchema);
export default Admin;
