import { requireSignIn } from "features/auth";
import {
  Sidebar,
  TransactionGameDetails,
  TransactionProofDetails,
} from "features/dashboard";
import type { NextPage } from "next";
import Head from "next/head";

const DashboardTransactionDetails: NextPage = () => (
  <>
    <Head>
      <title>Transaction #GG001 &ndash; StoreGG</title>
    </Head>

    <section className="transactions-detail overflow-auto">
      <Sidebar />

      <main>
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">
            Details #GG001
          </h2>
          <div className="main-content main-content-card overflow-auto">
            <section className="checkout mx-auto">
              <TransactionGameDetails />
              <hr />
              <TransactionProofDetails />
              <div className="d-md-block d-flex flex-column w-100">
                <a
                  className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                  href="#"
                >
                  WhatsApp ke Admin
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </section>

    <style jsx>{`
      .transactions-detail {
        background-color: #fbfcfd;
      }

      main {
        margin-left: 340px;
        height: 100%;
        margin-right: auto;
        position: relative;
        padding: 50px 50px 50px 0px;
      }

      .main-content {
        max-width: 860px;
      }

      .main-content-card {
        background-color: #ffffff;
        padding: 1.875rem;
        border-radius: 1rem;
        max-width: 860px;
      }

      .checkout {
        max-width: 800px;
      }

      hr {
        margin: 0;
        background-color: #e7eaf5;
        border: 0;
        opacity: 1;
      }

      .btn-whatsapp {
        padding: 0.75rem 2.875rem;
        background-color: #4d17e2;
      }

      @media (max-width: 992px) {
        main {
          width: 100%;
        }
      }
    `}</style>
  </>
);

export default requireSignIn(DashboardTransactionDetails);
