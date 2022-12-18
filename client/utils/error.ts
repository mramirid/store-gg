import { isError } from "lodash-es";

export function getErrorMessage(maybeError: unknown) {
  return toError(maybeError).message;
}

export function toError(maybeError: unknown) {
  if (isError(maybeError)) {
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

export function isErrorWithMessage(
  maybeError: unknown
): maybeError is ErrorWithMessage {
  return (
    typeof maybeError === "object" &&
    maybeError !== null &&
    "message" in maybeError &&
    typeof (maybeError as Record<string, unknown>)["message"] === "string"
  );
}

export type ErrorWithMessage = { message: string };
