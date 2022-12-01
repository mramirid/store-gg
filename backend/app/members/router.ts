import express, { Router } from "express";
import _ from "lodash";
import multer from "multer";
import { FormValidationError } from "../../lib/error";
import imagesMulter from "../middlewares/images.multer";
import controller from "./controller";

const membersRouter = Router();

membersRouter.get("/", handleUploadImage("avatar"), controller.signUp);

function handleUploadImage(fieldName: string): express.RequestHandler {
  const receiveImage = imagesMulter.setupSingleUpload(fieldName);

  return (req, res, next) => {
    receiveImage(req, res, (error: unknown) => {
      if (error instanceof multer.MulterError) {
        const validationError = new FormValidationError();
        validationError.addFieldError(fieldName, error.message);
        next(validationError);
        return;
      }

      if (_.isError(error)) {
        next(error);
        return;
      }

      next();
    });
  };
}

export default membersRouter;
