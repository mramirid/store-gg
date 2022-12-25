import { StatusCodes } from "http-status-codes";
import { ResponseError } from "lib/error";
import { isObject } from "lodash-es";
import type { ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { objectKeys } from "utils";
import { createContext } from "utils/context";
import { ErrorWithMessage, getErrorMessage } from "utils/error";
import { resolveApiEndpointURL } from "utils/format";

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
    submit: () => Promise<string>;
  }>();

export { useContext as useSignUpForm };

const validationErrorStatuses = Object.freeze([
  StatusCodes.UNPROCESSABLE_ENTITY,
  StatusCodes.CONFLICT,
]);

export function SignUpFormProvider(props: { children: ReactNode }) {
  const form = useForm<SignUpValues>();

  const setFormErrors = (
    errors: Record<keyof SignUpValues, ErrorWithMessage>
  ) => {
    objectKeys(errors).forEach((fieldName) => {
      form.setError(fieldName, {
        type: "onChange",
        message: getErrorMessage(errors[fieldName]),
      });
    });
  };

  const submit = async () => {
    const formValues = form.getValues();

    const formData = new FormData();
    formData.append("fullName", formValues.fullName);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    formData.append("favoriteCategory", formValues.favoriteCategory);
    if (isObject(formValues.avatar)) {
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

    const resBody = await response.json();

    if (!response.ok) {
      const errorMessage = getErrorMessage(resBody);

      if (validationErrorStatuses.includes(response.status)) {
        setFormErrors(resBody.cause.errors);
      }

      throw new ResponseError(errorMessage, response.status);
    }

    return resBody.jwtToken as string;
  };

  return <Provider value={{ form, submit }}>{props.children}</Provider>;
}
