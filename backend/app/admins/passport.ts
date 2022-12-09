import _ from "lodash";
import { Passport } from "passport";
import passportLocal from "passport-local";
import { CustomValidationError } from "../../lib/error";
import Admin, { AdminDoc } from "./model";

const adminPassport = new Passport();

const localStrategy = new passportLocal.Strategy(
  { usernameField: "email" },
  async (email, password, done) => {
    let admin: AdminDoc | null;

    try {
      admin = await Admin.findOne({ email });
    } catch (error) {
      done(error);
      return;
    }

    const validationError = new CustomValidationError();

    if (_.isNull(admin)) {
      validationError.addValidatorError("email", "Email not found.");
      done(validationError);
      return;
    }

    const doesPasswordMatch = await admin.verifyPassword(password);
    if (!doesPasswordMatch) {
      validationError.addValidatorError("password", "Password does not match!");
      done(validationError);
      return;
    }

    done(undefined, admin);
  }
);
adminPassport.use(localStrategy);

adminPassport.serializeUser<string>((admin, done) => {
  process.nextTick(() => {
    done(undefined, (admin as AdminDoc).id);
  });
});

adminPassport.deserializeUser<string>((adminId, done) => {
  process.nextTick(async () => {
    try {
      const admin = await Admin.findById(adminId);
      done(undefined, admin);
    } catch (error) {
      done(error);
    }
  });
});

export default adminPassport;
