import Link from "next/link";

export default function SignInForm() {
  return (
    <form className="mt-50">
      <div>
        <label
          htmlFor="email"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Email Address
        </label>
        <input
          type="email"
          className="form-control rounded-pill text-lg"
          id="email"
          name="email"
          aria-describedby="email"
          placeholder="Enter your email address"
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control rounded-pill text-lg"
          id="password"
          name="password"
          aria-describedby="password"
          placeholder="Your password"
        />
      </div>
      <Link href="/member" className="text-decoration-none">
        <button className="btn btn-sign-in fw-medium text-lg text-white rounded-pill d-block w-100 mt-50">
          Continue to Sign In
        </button>
      </Link>

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
