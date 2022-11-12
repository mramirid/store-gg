import _ from "lodash";
import type mongoose from "mongoose";

export function getErrorMessage(maybeError: unknown) {
  return toError(maybeError).message;
}

export function toError(maybeError: unknown) {
  if (_.isError(maybeError)) {
    return maybeError;
  }

  if (isErrorWithMessage(maybeError)) {
    return new Error(maybeError.message);
  }

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

function isErrorWithMessage(
  maybeError: unknown
): maybeError is { message: string } {
  return (
    typeof maybeError === "object" &&
    maybeError !== null &&
    "message" in maybeError &&
    typeof (maybeError as Record<string, unknown>)["message"] === "string"
  );
}

export function getValidationErrorMessage(
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
