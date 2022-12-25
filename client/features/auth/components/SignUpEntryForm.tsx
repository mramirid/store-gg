import TextInput from "components/TextInput";
import Link from "next/link";
import { useSignUpForm } from "../lib/sign-up-form";

export default function SignUpEntryForm() {
  const { form } = useSignUpForm();

  return (
    <form className="mt-50">
      <div>
        <TextInput
          {...form.register("fullName")}
          type="text"
          label="Full Name"
          id="fullName"
          aria-describedby="fullName"
          placeholder="Enter your full name"
          error={form.formState.errors.fullName}
        />
      </div>
      <div className="pt-30">
        <TextInput
          {...form.register("email")}
          type="email"
          label="Email Address"
          id="email"
          aria-describedby="email"
          placeholder="Enter your email address"
          error={form.formState.errors.email}
        />
      </div>
      <div className="pt-30">
        <TextInput
          {...form.register("password")}
          type="password"
          label="Password"
          id="password"
          aria-describedby="password"
          placeholder="Your password"
          error={form.formState.errors.password}
        />
      </div>
      <Link href="/sign-up/avatar" className="text-decoration-none">
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
