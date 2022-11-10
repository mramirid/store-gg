import classNames from "classnames";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LogoIcon from "../components/LogoIcon";
import { SignInForm } from "../features/authentication";

const SignIn: NextPage = () => (
  <>
    <Head>
      <title>Sign In &ndash; StoreGG</title>
    </Head>

    <div className="mx-auto">
      <div className="row vh-100">
        <div className="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
          <div className="container mx-auto">
            <header className="pb-50">
              <Link href="/" title="Homepage &ndash; StoreGG">
                <LogoIcon />
              </Link>
            </header>

            <main>
              <h1 className="text-4xl fw-bold color-palette-1 mb-10">
                Sign In
              </h1>
              <p className="text-lg color-palette-1 m-0">
                Masuk untuk melakukan proses top up
              </p>

              <SignInForm />

              <Link href="/sign-up" className="text-decoration-none">
                <span className="d-block mt-3 btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill w-100">
                  Sign Up
                </span>
              </Link>
            </main>
          </div>
        </div>

        <aside
          className={classNames(
            "d-none d-lg-flex flex-column align-items-center justify-content-center",
            "col-xxl-7 col-lg-6 bg-blue pt-lg-145 pb-lg-145"
          )}
        >
          <Image
            src="/images/story-banner.png"
            width={502}
            height={391}
            className="img-fluid"
            alt="Banner"
          />
          <h2 className="text-4xl fw-bold text-white mt-30 mb-30 mt-30">
            Win the battle.
            <br />
            Be the Champion.
          </h2>
          <p className="text-white m-0">
            Kami menyediakan jutaan cara untuk
            <br /> membantu players menjadi
            <br />
            pemenang sejati
          </p>
        </aside>
      </div>
    </div>

    <style jsx>{`
      .btn-sign-up {
        padding: 0.75rem;
        background-color: #e7eaf5;
      }

      .bg-blue {
        background-color: #1a1640;
      }

      @media (min-width: 992px) {
        .container {
          max-width: 437px;
        }
      }
    `}</style>
  </>
);

export default SignIn;
