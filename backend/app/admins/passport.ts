import _ from "lodash";
import passport from "passport";
import passportLocal from "passport-local";
import { FormValidationError } from "../../lib/error";
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

    const validationError = new FormValidationError();

    if (_.isNull(admin)) {
      validationError.addFieldError("email", "Email not found.");
      done(validationError);
      return;
    }

    const doesPasswordMatch = await admin.verifyPassword(password);
    if (!doesPasswordMatch) {
      validationError.addFieldError("password", "Password does not match!");
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

adminPassport.deserializeUser((adminId: string, done) => {
  process.nextTick(async () => {
    try {
      const admin = await Admin.findById(adminId);
      done(undefined, admin);
    } catch (error) {
      done(toError(error));
    }
  });
});

export default adminPassport;
