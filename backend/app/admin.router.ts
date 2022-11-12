import flash from "connect-flash";
import csrf from "csurf";
import express from "express";
import session from "express-session";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import passport from "passport";
import { env } from "../lib/constant";
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

const errorHandler: express.ErrorRequestHandler = (error, req, res, next) => {
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
adminRouter.use(errorHandler);

export default adminRouter;
