import cors from "cors";
import express from "express";
import createHttpError from "http-errors";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { CustomValidationError } from "../lib/error";
import { getErrorMessage, joinErrorMessages } from "../utils/error";
import categoriesClientRouter from "./categories/client.router";
import homeClientRouter from "./homes/client.router";
import memberPassport from "./members/passport";
import membersRouter from "./members/router";
import paymentMethodsClientRouter from "./payment-methods/client.router";
import transactionsClientRouter from "./transactions/client.router";
import vouchersClientRouter from "./vouchers/client.router";

const clientRouter = express.Router();

clientRouter.use(cors());

clientRouter.use(express.json());

clientRouter.use(memberPassport.initialize());

clientRouter.use("/homepage", homeClientRouter);
clientRouter.use("/vouchers", vouchersClientRouter);
clientRouter.use("/members", membersRouter);
clientRouter.use("/categories", categoriesClientRouter);
clientRouter.use("/transactions", transactionsClientRouter);
clientRouter.use("/payment-methods", paymentMethodsClientRouter);

clientRouter.use((_, __, next) => next(createHttpError(StatusCodes.NOT_FOUND)));

const validationErrorHandler: express.ErrorRequestHandler = (
  error,
  _,
  __,
  next
) => {
  if (error instanceof CustomValidationError) {
    const httpError = createHttpError(error.status);
    httpError.message = joinErrorMessages(error.errors);
    httpError.cause = error;
    next(httpError);
    return;
  }

  next(error);
};
clientRouter.use(validationErrorHandler);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: express.ErrorRequestHandler = (error, req, res, __) => {
  const isDevMode = req.app.get("env") === "development";

  if (createHttpError.isHttpError(error)) {
    const shouldExpose = isDevMode || error.expose;
    res.status(error.status).json({
      message: shouldExpose ? error.message : getReasonPhrase(error.status),
      cause: shouldExpose ? error.cause : undefined,
    });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: isDevMode ? getErrorMessage(error) : getReasonPhrase(error.status),
  });
};
clientRouter.use(errorHandler);

export default clientRouter;
