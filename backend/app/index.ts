import compression from "compression";
import flash from "connect-flash";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import { default as createError } from "http-errors";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import methodOverride from "method-override";
import logger from "morgan";
import passport from "passport";
import path from "path";
import { env } from "../lib/constant";
import format from "../utils/format";
import categoriesRouter from "./categories/router";

const app = express();

app.use(cors());

app.set("views", path.join("views"));
app.set("view engine", "ejs");

app.use("/admin-lte", express.static(path.join("node_modules", "admin-lte")));
app.use(express.static(path.join("public")));

app.use(logger("dev"));

app.use(helmet());

app.use(compression());

app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

app.use(passport.authenticate("session"));

app.use(flash());

app.use((__: express.Request, res: express.Response, next) => {
  res.locals["_"] = _;
  res.locals["format"] = format;

  next();
});

app.use("/", categoriesRouter);

// catch 404 and forward to error handler
app.use((_, __, next) => next(createError(404)));

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: express.ErrorRequestHandler = (error, req, res, _) => {
  // set locals, only providing error in development
  res.locals["message"] = error.message;
  res.locals["error"] = req.app.get("env") === "development" ? error : {};

  // render the error page
  res.status(error.status ?? StatusCodes.INTERNAL_SERVER_ERROR);
  res.render("error");
};
app.use(errorHandler);

export default app;
