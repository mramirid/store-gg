import Link from "next/link";

export default function SignInForm() {
  return (
    <form action="">
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
      <p className="text-lg color-palette-1 m-0">
        Masuk untuk melakukan proses top up
      </p>
      <div className="pt-50">
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
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <Link href="/member">
          <a
            className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
            role="button"
          >
            Continue to Sign In
          </a>
        </Link>
        <Link href="/sign-up">
          <a
            className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill"
            href="../src/sign-up.html"
            role="button"
          >
            Sign Up
          </a>
        </Link>
      </div>

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

        .btn-sign-up {
          padding: 0.75rem;
          background-color: #e7eaf5;
        }

        .button-group {
          width: 100%;
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
