import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import LogoIcon from "../../../components/LogoIcon";
import { requireSignIn } from "../../../features/auth";
import {
  CheckoutBillDetails,
  CheckoutConfirmation,
  CheckoutVoucherDetails,
} from "../../../features/voucher";

const Checkout: NextPage = () => {
  return (
    <>
      <Head>
        {/* TODO: display voucher name */}
        <title>Checkout VOUCHER_NAME &ndash; StoreGG</title>
      </Head>

      <div className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
        <div className="container-fluid">
          <header className="logo text-md-center text-start pb-50">
            <Link href="/" title="Homepage &ndash; StoreGG">
              <LogoIcon />
            </Link>
          </header>
          <main>
            <div className="title-text pt-md-50 pt-0">
              <h1 className="text-4xl fw-bold color-palette-1 mb-10">
                Checkout
              </h1>
              <p className="text-lg color-palette-1 mb-0">
                Waktunya meningkatkan cara bermain
              </p>
            </div>
            <CheckoutVoucherDetails />
            <hr />
            <CheckoutBillDetails />
            <CheckoutConfirmation />
          </main>
        </div>
      </div>

      <style jsx>{`
        .checkout {
          max-width: 800px;
        }

        hr {
          margin: 0;
          background-color: #e7eaf5;
          border: 0;
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default requireSignIn(Checkout);
