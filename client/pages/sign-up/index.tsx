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

    <section className="mx-auto pt-lg-100 pb-lg-100 pt-30 pb-47">
      <div className="container mx-auto">
        <div className="pb-50">
          <Link href="/">
            <a title="Homepage - StoreGG">
              <Logo />
            </a>
          </Link>
        </div>
        <SignUpEntryForm />
      </div>
    </section>

    <style jsx>{`
      @media (min-width: 992px) {
        .container {
          max-width: 437px;
        }
      }
    `}</style>
  </>
);

export default SignUp;
