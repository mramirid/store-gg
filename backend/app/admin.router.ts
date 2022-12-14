import flash from "connect-flash";
import connectMongoDBSession from "connect-mongodb-session";
import crypto from "crypto";
import csrf from "csurf";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import methodOverride from "method-override";
import path from "path";
import { env, mongoUri } from "../lib/constant";
import { version } from "../package.json";
import format from "../utils/format";
import { ensureAdminAuthenticated } from "./admins/middleware";
import adminPassport from "./admins/passport";
import adminsRouter from "./admins/router";
import banksRouter from "./banks/router";
import categoriesAdminRouter from "./categories/admin.router";
import homeAdminRouter from "./homes/admin.router";
import nominalsRouter from "./nominals/router";
import paymentMethodsAdminRouter from "./payment-methods/admin.router";
import transactionsAdminRouter from "./transactions/admin.router";
import vouchersAdminRouter from "./vouchers/admin.router";

const adminRouter = express.Router();

adminRouter.use(
  "/admin-lte",
  express.static(path.resolve("node_modules", "admin-lte"))
);

adminRouter.use(express.urlencoded({ extended: false }));

// Using a nonce with CSP (https://content-security-policy.com/nonce)
// Sets the `script-src` directive to "'self' 'nonce-e33ccde670f149c1789b1e1e113b0916'" (or similar)
adminRouter.use(
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

adminRouter.use(methodOverride("_method"));

const MongoDBStore = connectMongoDBSession(session);
const mongoDBStore = new MongoDBStore({
  uri: mongoUri,
  collection: "sessions",
});
adminRouter.use(
  session({
    secret: env.BACKEND_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoDBStore,
  })
);

adminRouter.use(adminPassport.initialize());
adminRouter.use(adminPassport.session());

adminRouter.use(flash());

adminRouter.use((req: express.Request, res: express.Response, next) => {
  res.locals["_"] = _;
  res.locals["format"] = format;
  res.locals["appVersion"] = version;
  res.locals["req"] = req;

  next();
});

adminRouter.use(csrf(), (req, res, next) => {
  res.locals["csrfToken"] = req.csrfToken();
  next();
});

adminRouter.use(adminsRouter);
adminRouter.use(ensureAdminAuthenticated);
adminRouter.use("/", homeAdminRouter);
adminRouter.use("/categories", categoriesAdminRouter);
adminRouter.use("/nominals", nominalsRouter);
adminRouter.use("/vouchers", vouchersAdminRouter);
adminRouter.use("/banks", banksRouter);
adminRouter.use("/payment-methods", paymentMethodsAdminRouter);
adminRouter.use("/transactions", transactionsAdminRouter);

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
