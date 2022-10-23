import classNames from "classnames";
import Logo from "components/atoms/logo";
import SignInForm from "components/organisms/sign-in-form";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const SignIn: NextPage = () => (
  <>
    <Head>
      <title>Sign In - StoreGG</title>
    </Head>

    <section className="mx-auto">
      <div className="row vh-100">
        <div className="col-xxl-5 col-lg-6 my-auto py-lg-0 pt-lg-50 pb-lg-50 pt-30 pb-47 px-0">
          <div className="container mx-auto">
            <div className="pb-50">
              <Link href="/">
                <a title="Homepage - StoreGG">
                  <Logo />
                </a>
              </Link>
            </div>
            <SignInForm />
          </div>
        </div>
        <div
          className={classNames(
            "d-none d-lg-flex flex-column align-items-center justify-content-center",
            "col-xxl-7 col-lg-6 bg-blue pt-lg-145 pb-lg-145"
          )}
        >
          <Image
            src="/images/header-2.png"
            width={502}
            height={391}
            className="img-fluid"
            alt=""
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
        </div>
      </div>
    </section>

    <style jsx>{`
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
