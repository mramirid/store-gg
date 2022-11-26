import _ from "lodash";
import mongoose from "mongoose";

export class FormValidationError extends mongoose.Error.ValidationError {
  addFieldError(fieldName: string, message: string) {
    this.addError(fieldName, new mongoose.Error.ValidatorError({ message }));
  }

  get hasFieldError() {
    return !_.isEmpty(this.errors);
  }
}
