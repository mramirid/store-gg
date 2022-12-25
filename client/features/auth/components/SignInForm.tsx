import TextInput from "components/TextInput";
import { StatusCodes } from "http-status-codes";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { objectKeys } from "utils";
import { ErrorWithMessage, getErrorMessage } from "utils/error";
import { resolveApiEndpointURL } from "utils/format";
import { useJwt } from "../lib/jwt";

type SignInValues = {
  email: string;
  password: string;
};

const validationErrorStatuses = Object.freeze([
  StatusCodes.UNPROCESSABLE_ENTITY,
  StatusCodes.NOT_FOUND,
  StatusCodes.UNAUTHORIZED,
]);

export default function SignInForm() {
  const { register, handleSubmit, setError, formState } =
    useForm<SignInValues>();

  const router = useRouter();

  const setFormErrors = (
    errors: Record<keyof SignInValues, ErrorWithMessage>
  ) => {
    objectKeys(errors).forEach((fieldName) => {
      setError(fieldName, {
        type: "onChange",
        message: getErrorMessage(errors[fieldName]),
      });
    });
  };

  const jwt = useJwt();

  const submitHandler = async (formValues: SignInValues) => {
    let response: Response;
    try {
      response = await fetch(resolveApiEndpointURL("/members/sign-in"), {
        method: "post",
        body: JSON.stringify(formValues),
        headers: { "Content-Type": "application/json" },
      });
    } catch (_) {
      toast.error("Failed to sign in. Try again later.");
      return;
    }

    const resBody = await response.json();

    if (!response.ok) {
      const errorMessage = getErrorMessage(resBody);
      toast.error(errorMessage);

      if (validationErrorStatuses.includes(response.status)) {
        setFormErrors(resBody.cause.errors);
      }
      return;
    }

    jwt.setToken(resBody.jwtToken);

    router.replace("/dashboard");
  };

  return (
    <form className="mt-50" onSubmit={handleSubmit(submitHandler)}>
      <div>
        <TextInput
          {...register("email")}
          label="Email Address"
          type="email"
          id="email"
          aria-describedby="email"
          placeholder="Enter your email address"
          error={formState.errors.email}
        />
      </div>
      <div className="pt-30">
        <TextInput
          {...register("password")}
          label="Password"
          type="password"
          id="password"
          aria-describedby="password"
          placeholder="Your password"
          error={formState.errors.password}
        />
      </div>
      <button
        className="btn btn-sign-in fw-medium text-lg text-white rounded-pill d-block w-100 mt-50"
        type="submit"
      >
        Continue to Sign In
      </button>

      <style jsx>{`
        input[type="password"],
        input[type="email"] {
          border: 1px solid #0c145a;
          padding: 0.75rem 1.625rem;
          color: #0c145a;
        }

        input[type="password"]:focus-within,
        input[type="email"]:focus-within {
          color: #0c145a;
        }

        input[type="password"]::placeholder,
        input[type="email"]::placeholder {
          color: #ccd0dd;
        }

        .btn-sign-in {
          padding: 0.75rem;
          background-color: #4d17e2;
        }

        @media (min-width: 992px) {
          input[type="password"],
          input[type="email"] {
            max-width: 437px;
          }
        }
      `}</style>
    </form>
  );
}
