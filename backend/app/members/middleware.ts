import type express from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { isPassportAuthenticationError } from "../../utils/error";
import memberPassport from "./passport";

const authenticateErrorHandler: express.ErrorRequestHandler = (
  error,
  _,
  __,
  next
) => {
  if (isPassportAuthenticationError(error)) {
    const httpError = createHttpError(error.status);
    httpError.message = error.message;
    next(httpError);
    return;
  }

  next(error);
};

export const ensureMemberAuthenticated: express.RequestHandler[] = [
  memberPassport.authenticate("jwt", {
    session: false,
    failWithError: true,
  }),
  (req, _, next) => {
    if (req.isUnauthenticated()) {
      next(createHttpError(StatusCodes.UNAUTHORIZED));
      return;
    }

    next();
  },
  authenticateErrorHandler,
];
