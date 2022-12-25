import InputErrorMessage from "components/InputErrorMessage";
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
  const { email: emailError, password: passwordError } = formState.errors;

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
        <label
          htmlFor="email"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          className="form-control rounded-pill text-lg"
          id="email"
          aria-describedby="email"
          placeholder="Enter your email address"
        />
        <InputErrorMessage className="mt-2" error={emailError} />
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          className="form-control rounded-pill text-lg"
          id="password"
          aria-describedby="password"
          placeholder="Your password"
        />
        <InputErrorMessage className="mt-2" error={passwordError} />
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
