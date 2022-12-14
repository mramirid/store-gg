import type { StatusCodes } from "http-status-codes";

export class ResponseError extends Error {
  constructor(message: string, public status: StatusCodes) {
    super(message);
  }
}
