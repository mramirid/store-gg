import type mongoose from "mongoose";

export class ValidationError extends Error {
  constructor(
    public readonly view: string,
    public readonly pageTitle: string,
    public readonly mongooseValidationError: mongoose.Error.ValidationError
  ) {
    super();
  }
}
