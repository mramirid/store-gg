import { isObject } from "lodash-es";
import Link from "next/link";
import { useSignUpContext } from "../lib/sign-up.context";

export default function SignUpEntryForm() {
  const { form } = useSignUpContext();
  const {
    fullName: fullNameError,
    email: emailError,
    password: passwordError,
  } = form.formState.errors;

  return (
    <form className="mt-50">
      <div>
        <label
          htmlFor="fullName"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Full Name
        </label>
        <input
          {...form.register("fullName")}
          type="text"
          className="form-control rounded-pill text-lg"
          id="fullName"
          aria-describedby="fullName"
          placeholder="Enter your name"
        />
        {isObject(fullNameError) && (
          <div className="mt-2 text-danger text-sm">
            {fullNameError.message}
          </div>
        )}
      </div>
      <div className="pt-30">
        <label
          htmlFor="email"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Email Address
        </label>
        <input
          {...form.register("email")}
          type="email"
          className="form-control rounded-pill text-lg"
          id="email"
          aria-describedby="email"
          placeholder="Enter your email address"
        />
        {isObject(emailError) && (
          <div className="mt-2 text-danger text-sm">{emailError.message}</div>
        )}
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password
        </label>
        <input
          {...form.register("password")}
          type="password"
          className="form-control rounded-pill text-lg"
          id="password"
          aria-describedby="password"
          placeholder="Your password"
        />
        {isObject(passwordError) && (
          <div className="mt-2 text-danger text-sm">
            {passwordError.message}
          </div>
        )}
      </div>
      <Link href="/sign-up/photo" className="text-decoration-none">
        <button
          className="d-block w-100 mt-50 btn btn-sign-up fw-medium text-lg text-white rounded-pill"
          type="button"
        >
          Continue
        </button>
      </Link>

      <style jsx>{`
        input[type="password"],
        input[type="email"],
        input[type="text"] {
          border: 1px solid #0c145a;
          padding: 0.75rem 1.625rem;
          color: #0c145a;
        }

        input[type="password"]:focus-within,
        input[type="email"]:focus-within,
        input[type="text"]:focus-within {
          color: #0c145a;
        }

        input[type="password"]::placeholder,
        input[type="email"]::placeholder,
        input[type="text"]::placeholder {
          color: #ccd0dd;
        }

        .btn-sign-up {
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
