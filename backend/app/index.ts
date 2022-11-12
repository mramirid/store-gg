import compression from "compression";
import cors from "cors";
import crypto from "crypto";
import express from "express";
import helmet from "helmet";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import methodOverride from "method-override";
import logger from "morgan";
import path from "path";
import adminRouter from "./admin.router";

const app = express();

app.use(cors());

app.set("views", path.join("views"));
app.set("view engine", "ejs");

app.use("/admin-lte", express.static(path.join("node_modules", "admin-lte")));
app.use(express.static(path.join("public")));

app.use(logger("dev"));

// Using a nonce with CSP (https://content-security-policy.com/nonce)
// Sets the `script-src` directive to "'self' 'nonce-e33ccde670f149c1789b1e1e113b0916'" (or similar)
app.use(
  (_, res, next) => {
    res.locals["cspNonce"] = crypto.randomUUID();
    next();
  },
  helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [
          "'self'",
          (_, res) => `'nonce-${(res as express.Response).locals["cspNonce"]}'`,
        ],
      },
    },
  })
);

app.use(compression());

app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use((_, __, next) => next(createError(404)));

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: express.ErrorRequestHandler = (error, req, res, _) => {
  // set locals, only providing error in development
  res.locals["message"] = error.message;
  res.locals["error"] = req.app.get("env") === "development" ? error : {};

  // render the error page
  res.status(error.status ?? StatusCodes.INTERNAL_SERVER_ERROR).render("error");
};
app.use(errorHandler);

export default app;
