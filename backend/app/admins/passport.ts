import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import _ from "lodash";
import mongoose from "mongoose";
import passport from "passport";
import passportLocal from "passport-local";
import { toError } from "../../utils/error";
import Admin, { type AdminDoc } from "./model";

const adminPassport = new passport.Passport();

const localStrategy = new passportLocal.Strategy(
  { usernameField: "email" },
  async (email, password, done) => {
    let admin: AdminDoc | null;

    try {
      admin = await Admin.findOne({ email });
    } catch (error) {
      done(toError(error));
      return;
    }

    const validationError = new mongoose.Error.ValidationError();

    if (_.isNull(admin)) {
      validationError.addError(
        "email",
        new mongoose.Error.ValidatorError({ message: "Email not found." })
      );
      done(validationError);
      return;
    }

    const doesPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!doesPasswordMatch) {
      validationError.addError(
        "password",
        new mongoose.Error.ValidatorError({
          message: "Password does not match!",
        })
      );
      done(validationError);
      return;
    }

    done(undefined, admin);
  }
);
adminPassport.use(localStrategy);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends AdminDoc {}
  }
}

adminPassport.serializeUser<string>((admin: AdminDoc, done) => {
  process.nextTick(() => {
    done(undefined, admin.id);
  });
});

adminPassport.deserializeUser((adminId: string, done) => {
  process.nextTick(async () => {
    try {
      const admin = await Admin.findById(adminId).orFail(
        new createHttpError.NotFound("Admin not found!")
      );
      done(undefined, admin);
    } catch (error) {
      done(toError(error));
    }
  });
});

export default adminPassport;
