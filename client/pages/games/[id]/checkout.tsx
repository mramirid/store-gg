import Logo from "components/atoms/logo";
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

    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <Link href="/">
            <a title="Homepage - StoreGG">
              <Logo />
            </a>
          </Link>
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">
            Waktunya meningkatkan cara bermain
          </p>
        </div>
        <CheckoutGame />
        <hr />
        <CheckoutDetails />
        <CheckoutConfirmation />
      </div>
    </section>

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
