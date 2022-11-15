import _ from "lodash";
import mongoose from "mongoose";
import { getErrorMessage } from "../utils/error";

export class FormValidationError extends mongoose.Error.ValidationError {
  #renderOptions: Record<string, unknown> = {};

  constructor(
    public readonly view: string,
    mongooseValidationError: mongoose.Error.ValidationError
  ) {
    super(mongooseValidationError);
    this.errors = mongooseValidationError.errors;
    this.message = this.getMongooseValidationErrorMessage(
      mongooseValidationError
    );
  }

  private getMongooseValidationErrorMessage(
    validationError: mongoose.Error.ValidationError
  ) {
    const errors = Object.values(validationError.errors);
    const messages = errors.map(getErrorMessage);

    const formatter = new Intl.ListFormat("en-US", {
      style: "long",
      type: "conjunction",
    });

    return formatter.format(messages);
  }

  addRenderOptions(v: Record<string, unknown>) {
    Object.assign(this.renderOptions, v);
  }

  get renderOptions(): Record<string, unknown> {
    return this.#renderOptions;
  }
}
