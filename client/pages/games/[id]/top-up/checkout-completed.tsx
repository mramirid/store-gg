import { CheckoutCompletedIlustration } from "features/top-up";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const CheckoutCompleted: NextPage = () => (
  <>
    <Head>
      <title>Checkout Completed &ndash; StoreGG</title>
    </Head>

    <main className="mx-auto pt-lg-145 pb-lg-145 pt-100 pb-80">
      <div className="container-fluid">
        <div className="text-center">
          <CheckoutCompletedIlustration className="img-fluid" />
        </div>
        <div className="pt-70 pb-50">
          <h1 className="text-4xl fw-bold text-center color-palette-1 mb-10">
            Checkout Completed
          </h1>
          <p className="text-lg text-center color-palette-1 m-0">
            Kami akan periksa pembayaran Anda
            <br className="d-sm-block d-none" /> dan menghubungi via WhatsApp
          </p>
        </div>
        <div className="button-group d-flex flex-column mx-auto">
          <Link href="/member">
            <button className="btn btn-dashboard fw-medium text-lg text-white rounded-pill mb-16">
              My Dashboard
            </button>
          </Link>
          <a
            className="btn btn-whatsapp fw-medium text-lg color-palette-1 rounded-pill"
            href="#"
          >
            WhatsApp ke Admin
          </a>
        </div>
      </div>
    </main>

    <style jsx>{`
      .btn-dashboard {
        padding: 0.75rem 3.313rem;
        background-color: #4d17e2;
      }

      .btn-whatsapp {
        padding: 0.75rem 1.75rem;
        background-color: #e7eaf5;
      }

      @media (min-width: 768px) {
        .button-group {
          width: 250px;
        }
      }
    `}</style>
  </>
);

export default CheckoutCompleted;
