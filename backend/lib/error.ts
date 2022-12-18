import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import mongoose from "mongoose";

export class CustomValidationError extends mongoose.Error.ValidationError {
  status = StatusCodes.BAD_REQUEST;

  constructor(error?: mongoose.Error.ValidationError) {
    super();

    if (_.isObject(error)) {
      this.errors = error.errors;
      this.message = error.message;
      this.cause = error.cause;
    }
  }

  addValidatorError(path: string, message: string) {
    this.addError(path, new CustomValidatorError(message));
  }

  get hasError() {
    return !_.isEmpty(this.errors);
  }
}

class CustomValidatorError extends mongoose.Error.ValidatorError {
  constructor(public override message: string) {
    super({ message });
  }
}
