import cors from "cors";
import express from "express";
import createHttpError from "http-errors";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { getErrorMessage, joinFormErrorMessages } from "../utils/error";
import memberHomeController from "./homes/member.controller";

const memberRouter = express.Router();

memberRouter.use(cors());

memberRouter.use(express.json());

memberRouter.use("/homepage", memberHomeController.getHomepageData);

memberRouter.use((_, __, next) =>
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

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({
      message: isDevMode
        ? getErrorMessage(error)
        : getReasonPhrase(error.status),
    });
};
memberRouter.use(errorHandler);

export default memberRouter;
