import CheckoutCompletedIlustration from "components/atoms/checkout-completed-ilustration";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const CheckoutCompleted: NextPage = () => (
  <>
    <Head>
      <title>Checkout Completed - StoreGG</title>
    </Head>

    <section className="mx-auto pt-lg-145 pb-lg-145 pt-100 pb-80">
      <div className="container-fluid">
        <div className="text-center">
          <CheckoutCompletedIlustration className="img-fluid" />
        </div>
        <div className="pt-70 pb-50">
          <h2 className="text-4xl fw-bold text-center color-palette-1 mb-10">
            Checkout Completed
          </h2>
          <p className="text-lg text-center color-palette-1 m-0">
            Kami akan periksa pembayaran Anda
            <br className="d-sm-block d-none" /> dan menghubungi via WhatsApp
          </p>
        </div>
        <div className="button-group d-flex flex-column mx-auto">
          <Link href="/member">
            <a
              className="btn btn-dashboard fw-medium text-lg text-white rounded-pill mb-16"
              role="button"
            >
              My Dashboard
            </a>
          </Link>
          <Link href="/404">
            <a
              className="btn btn-whatsapp fw-medium text-lg color-palette-1 rounded-pill"
              role="button"
            >
              WhatsApp ke Admin
            </a>
          </Link>
        </div>
      </div>
    </section>

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
