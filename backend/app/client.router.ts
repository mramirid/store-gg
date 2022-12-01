import cors from "cors";
import express from "express";
import createHttpError from "http-errors";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { getErrorMessage, joinFormErrorMessages } from "../utils/error";
import clientHomeController from "./homes/client.controller";
import memberPassport from "./members/passport";
import membersRouter from "./members/router";
import clientVouchersRouter from "./vouchers/client.router";

const clientRouter = express.Router();

clientRouter.use(cors());

clientRouter.use(express.json());

clientRouter.use(memberPassport.initialize());

clientRouter.use("/homepage", clientHomeController.getHomepageData);
clientRouter.use("/vouchers", clientVouchersRouter);
clientRouter.use("/members", membersRouter);

clientRouter.use((_, __, next) =>
  next(new createHttpError.NotFound("Page not found!"))
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: express.ErrorRequestHandler = (error, req, res, __) => {
  if (error instanceof mongoose.Error.ValidationError) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: joinFormErrorMessages(error.errors),
      formErrors: error.errors,
    });
    return;
  }

  const isDevMode = req.app.get("env") === "development";

  if (createHttpError.isHttpError(error)) {
    res.status(error.status).json({
      message:
        error.expose || isDevMode
          ? error.message
          : getReasonPhrase(error.status),
    });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: isDevMode ? getErrorMessage(error) : getReasonPhrase(error.status),
  });
};
clientRouter.use(errorHandler);

export default clientRouter;
