import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import type { ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { ResponseError, ResponseValidationError } from "../../../lib/error";
import { createContext } from "../../../utils/context";
import {
  ErrorWithMessage,
  getErrorMessage,
  isErrorWithMessage,
} from "../../../utils/error";
import { resolveApiEndpointURL } from "../../../utils/format";

type SignUpValues = {
  fullName: string;
  email: string;
  password: string;
  favoriteCategory: string;
  avatar?: File;
};

const [useContext, Provider] =
  createContext<{
    form: UseFormReturn<SignUpValues>;
    signUp: () => Promise<string>;
  }>();

export { useContext as useSignUpContext };

export function SignUpContextProvider(props: { children: ReactNode }) {
  const form = useForm<SignUpValues>();

  const setFormErrors = (
    errors: Record<keyof SignUpValues, ErrorWithMessage>
  ) => {
    if (isErrorWithMessage(errors["fullName"])) {
      form.setError("fullName", {
        type: "onChange",
        message: errors["fullName"].message,
      });
    }
    if (isErrorWithMessage(errors["email"])) {
      form.setError("email", {
        type: "onChange",
        message: errors["email"].message,
      });
    }
    if (isErrorWithMessage(errors["password"])) {
      form.setError("password", {
        type: "onChange",
        message: errors["password"].message,
      });
    }
    if (isErrorWithMessage(errors["favoriteCategory"])) {
      form.setError("favoriteCategory", {
        type: "onChange",
        message: errors["favoriteCategory"].message,
      });
    }
    if (isErrorWithMessage(errors["avatar"])) {
      form.setError("avatar", {
        type: "onChange",
        message: errors["avatar"].message,
      });
    }
  };

  const signUp = async () => {
    const formValues = form.getValues();

    const formData = new FormData();
    formData.append("fullName", formValues.fullName);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("favoriteCategory", formValues.favoriteCategory);
    if (_.isObject(formValues.avatar)) {
      formData.append("avatar", formValues.avatar, formValues.avatar.name);
    }

    let response: Response;
    try {
      response = await fetch(resolveApiEndpointURL("/members"), {
        method: "post",
        body: formData,
      });
    } catch (error) {
      throw new Error("Failed to sign up. Try again later.", { cause: error });
    }

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = getErrorMessage(data);

      if (
        response.status === StatusCodes.UNPROCESSABLE_ENTITY ||
        response.status === StatusCodes.CONFLICT
      ) {
        const validationError = new ResponseValidationError(
          errorMessage,
          data.cause.errors,
          response.status
        );
        setFormErrors(validationError.errors);
        throw validationError;
      }

      throw new ResponseError(errorMessage, response.status);
    }

    return data.jwtToken as string;
  };

  return <Provider value={{ form, signUp }}>{props.children}</Provider>;
}

// type JwtPayload = jwt.JwtPayload & {
//   fullName: string;
//   email: string;
//   avatarName?: string;
//   phoneNumber?: string;
// };

// function saveJwt(jwtToken: string) {
//   const jwtPayload = jwt.decode(jwtToken) as JwtPayload;
//   console.log(jwtPayload);
// }
