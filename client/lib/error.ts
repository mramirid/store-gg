import type { StatusCodes } from "http-status-codes";
import type { ErrorWithMessage } from "../utils/error";

export class ResponseError extends Error {
  constructor(message: string, public status: StatusCodes) {
    super(message);
  }
}
export class ResponseValidationError extends ResponseError {
  constructor(
    message: string,
    public errors: Record<string, ErrorWithMessage>,
    status: StatusCodes
  ) {
    super(message, status);
  }
}
