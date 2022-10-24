import Logo from "components/atoms/logo";
import SignUpEntryForm from "components/organisms/sign-up-entry-form";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const SignUp: NextPage = () => (
  <>
    <Head>
      <title>Sign Up - StoreGG</title>
    </Head>

    <div className="mx-auto pt-lg-100 pb-lg-100 pt-30 pb-47">
      <div className="container mx-auto">
        <header className="pb-50">
          <Link href="/">
            <a title="Homepage - StoreGG">
              <Logo />
            </a>
          </Link>
        </header>

        <main>
          <h1 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h1>
          <p className="text-lg color-palette-1 m-0">
            Daftar dan bergabung dengan kami
          </p>

          <SignUpEntryForm />

          <Link href="/sign-in">
            <a
              className="btn d-block mt-3 btn-sign-in fw-medium text-lg color-palette-1 rounded-pill"
              role="button"
            >
              Sign In
            </a>
          </Link>
        </main>
      </div>
    </div>

    <style jsx>{`
      .btn-sign-in {
        padding: 0.75rem;
        background-color: #e7eaf5;
      }

      @media (min-width: 992px) {
        .container {
          max-width: 437px;
        }
      }
    `}</style>
  </>
);

export default SignUp;
