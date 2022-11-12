import flash from "connect-flash";
import csrf from "csurf";
import express from "express";
import session from "express-session";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import type mongoose from "mongoose";
import passport from "passport";
import { env } from "../lib/constant";
import { ValidationError } from "../lib/error";
import { AlertStatuses, getAlert, setAlert } from "../utils/alert";
import { getErrorMessage } from "../utils/error";
import format from "../utils/format";
import categoriesRouter from "./categories/router";
import homeRouter from "./home/router";

const adminRouter = express.Router();

adminRouter.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

adminRouter.use(passport.authenticate("session"));

adminRouter.use(flash());

adminRouter.use((__: express.Request, res: express.Response, next) => {
  res.locals["_"] = _;
  res.locals["format"] = format;

  next();
});

adminRouter.use(csrf(), (req, res, next) => {
  res.locals["csrfToken"] = req.csrfToken();
  next();
});

adminRouter.use("/", homeRouter);

adminRouter.use("/categories", categoriesRouter);

adminRouter.use((_, res) => {
  res.status(StatusCodes.NOT_FOUND).render("admin/404", {
    pageTitle: "404 Not Found",
    statusCode: StatusCodes.NOT_FOUND,
  });
});

const validationErrorHandler: express.ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (error instanceof ValidationError) {
    setAlert(req, {
      message: getMongooseValidationErrorMessage(error.mongooseValidationError),
      status: AlertStatuses.Error,
    });

    res.render(error.view, {
      pageTitle: error.pageTitle,
      alert: getAlert(req),
      formData: req.body,
    });

    return;
  }

  next(error);
};
adminRouter.use(validationErrorHandler);

function getMongooseValidationErrorMessage(
  validationError: mongoose.Error.ValidationError
) {
  const errors = Object.values(validationError.errors);
  const messages = errors.map(getErrorMessage);

  const formatter = new Intl.ListFormat("en-US", {
    style: "long",
    type: "conjunction",
  });

  return formatter.format(messages);
}

const fallbackErrorHandler: express.ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  if (req.app.get("env") === "development") {
    next(error);
    return;
  }

  const statusCode = error.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).render("admin/error", {
    pageTitle: "Error Page",
    statusCode,
  });
};
adminRouter.use(fallbackErrorHandler);

export default adminRouter;
