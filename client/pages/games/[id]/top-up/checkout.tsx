import LogoIcon from "components/atoms/logo.icon";
import { CheckoutConfirmation } from "components/organisms/checkout-confirmation";
import { CheckoutDetails } from "components/organisms/checkout-details";
import { CheckoutGame } from "components/organisms/checkout-game";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Checkout: NextPage = () => (
  <>
    <Head>
      <title>Checkout GAME_NAME - StoreGG</title>
    </Head>

    <div className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <header className="logo text-md-center text-start pb-50">
          <Link href="/" title="Homepage - StoreGG">
            <LogoIcon />
          </Link>
        </header>
        <main>
          <div className="title-text pt-md-50 pt-0">
            <h1 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h1>
            <p className="text-lg color-palette-1 mb-0">
              Waktunya meningkatkan cara bermain
            </p>
          </div>
          <CheckoutGame />
          <hr />
          <CheckoutDetails />
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

export default Checkout;