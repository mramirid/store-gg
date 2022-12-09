import type express from "express";
import _ from "lodash";
import mongoose from "mongoose";
import { CustomValidationError } from "../../lib/error";
import { AlertStatuses, buildAlert, setAlert } from "../../utils/alert";
import {
  isPassportAuthenticationError,
  joinErrorMessages,
} from "../../utils/error";
import type { AdminDoc, TAdmin } from "./model";
import Admin from "./model";

function viewSignUp(_: express.Request, res: express.Response) {
  renderViewSignUp(res, {
    formData: undefined,
    formErrors: undefined,
  });
}

async function signUp(
  req: express.Request<unknown, unknown, SignupReqBody>,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.body.password !== req.body.retypePassword) {
    const validationError = new CustomValidationError();
    validationError.addValidatorError(
      "retypePassword",
      "The retype password does not match with the password you entered"
    );
    next(validationError);
    return;
  }

  let admin: AdminDoc;

  try {
    admin = await Admin.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });
  } catch (error) {
    next(error);
    return;
  }

  req.login(admin, (error) => {
    if (error) {
      next(error);
      return;
    }

    setAlert(req, {
      message: "Sign-up success",
      status: AlertStatuses.Success,
    });
    res.redirect("/admin");
  });
}

const signUpErrorHandler: express.ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof mongoose.Error.ValidationError) {
    renderViewSignUp(res, {
      formData: req.body,
      formErrors: error.errors,
    });
    return;
  }

  next(error);
};

type SignupReqBody = mongoose.MergeType<TAdmin, { retypePassword: string }>;

function renderViewSignUp(
  res: express.Response,
  options: {
    formData: SignupReqBody | undefined;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/sign-up", {
    pageTitle: "Sign Up as Admin",
    alert,
    ...options,
  });
}

function viewSignIn(_: express.Request, res: express.Response) {
  renderViewSignIn(res, undefined, {
    formData: undefined,
    formErrors: undefined,
  });
}

const signInErrorHandler: express.ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (isPassportAuthenticationError(error)) {
    renderViewSignIn(res, req.flash("error").at(0), {
      formData: req.body,
      formErrors: undefined,
    });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    renderViewSignIn(res, undefined, {
      formData: req.body,
      formErrors: error.errors,
    });
    return;
  }

  next(error);
};

type SignInReqBody = Pick<TAdmin, "email" | "password">;

function renderViewSignIn(
  res: express.Response,
  passportErrorMessage: string | undefined,
  renderOptions: {
    formData: SignInReqBody | undefined;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alertMessage = _.isObject(renderOptions.formErrors)
    ? joinErrorMessages(renderOptions.formErrors)
    : passportErrorMessage;

  const alert = _.isString(alertMessage)
    ? buildAlert(alertMessage, AlertStatuses.Error)
    : undefined;

  res.render("admin/sign-in", {
    pageTitle: "Sign In to Admin Dashboard",
    alert,
    ...renderOptions,
  });
}

function signOut(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  req.logout((error) => {
    if (error) {
      next(error);
      return;
    }

    res.redirect("/admin/sign-in");
  });
}

export default {
  viewSignUp,
  signUp,
  signUpErrorHandler,
  viewSignIn,
  signInErrorHandler,
  signOut,
};
