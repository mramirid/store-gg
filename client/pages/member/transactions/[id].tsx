import { Sidebar } from "features/dashboard";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const MemberTransactionDetails: NextPage = () => (
  <>
    <Head>
      <title>Transaction Details - StoreGG</title>
    </Head>

    <section className="transactions-detail overflow-auto">
      <Sidebar />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">
            Details #GG001
          </h2>
          <div className="details">
            <div className="main-content main-content-card overflow-auto">
              <section className="checkout mx-auto">
                <div className="d-flex flex-row  align-items-center justify-content-between mb-30">
                  <div className="game-checkout d-flex flex-row align-items-center">
                    <div className="pe-4">
                      <div className="cropped">
                        <Image
                          className="img-fluid"
                          src={require("features/homepage/assets/game-3.png")}
                          width={281}
                          height={381}
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <p className="fw-bold text-xl color-palette-1 mb-10">
                        Mobile Legends:
                        <br /> The New Battle 2021
                      </p>
                      <p className="color-palette-2 m-0">Category: Mobile</p>
                    </div>
                  </div>
                  <div>
                    <p className="fw-medium text-center label pending m-0 rounded-pill">
                      Pending
                    </p>
                  </div>
                </div>
                <hr />
                <div className="purchase pt-30">
                  <h2 className="fw-bold text-xl color-palette-1 mb-20">
                    Purchase Details
                  </h2>
                  <p className="text-lg color-palette-1 mb-20">
                    Your Game ID{" "}
                    <span className="purchase-details">masayoshizero</span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Order ID <span className="purchase-details">#GG001</span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Item <span className="purchase-details">250 Diamonds</span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Price{" "}
                    <span className="purchase-details">Rp 42.280.500</span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Tax (10%){" "}
                    <span className="purchase-details">Rp 4.228.000</span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Total{" "}
                    <span className="purchase-details color-palette-4">
                      Rp 55.000.600
                    </span>
                  </p>
                </div>
                <div className="payment pt-10 pb-10">
                  <h2 className="fw-bold text-xl color-palette-1 mb-20">
                    Payment Informations
                  </h2>
                  <p className="text-lg color-palette-1 mb-20">
                    Your Account Name{" "}
                    <span className="purchase-details">
                      Masayoshi Angga Zero
                    </span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Type{" "}
                    <span className="payment-details">Worldwide Transfer</span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Bank Name <span className="payment-details">Mandiri</span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Bank Account Name{" "}
                    <span className="payment-details">
                      PT Store GG Indonesia
                    </span>
                  </p>
                  <p className="text-lg color-palette-1 mb-20">
                    Bank Number{" "}
                    <span className="payment-details">1800 - 9090 - 2021</span>
                  </p>
                </div>
                <div className="d-md-block d-flex flex-column w-100">
                  <a
                    className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                    href="#"
                    role="button"
                  >
                    WhatsApp ke Admin
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </section>

    <style jsx>{`
      .transactions-detail {
        background-color: #fbfcfd;
      }

      .transactions-detail main.main-wrapper {
        margin-left: 340px;
        height: 100%;
        margin-right: auto;
        position: relative;
        padding: 50px 50px 50px 0px;
      }

      .transactions-detail main .main-content {
        max-width: 860px;
      }

      .transactions-detail .btn-status.btn-active {
        color: #ffffff;
        background-color: #0c145a;
      }

      .transactions-detail .btn-status {
        color: #0c145a;
        background-color: #e7eaf5;
      }

      .transactions-detail .details .main-content-card {
        background-color: #ffffff;
        padding: 1.875rem;
        border-radius: 1rem;
        max-width: 860px;
      }

      .transactions-detail .details .game-title-header {
        margin-top: 10px;
        margin-bottom: 10px;
      }

      .transactions-detail .details .game-title {
        white-space: nowrap;
        width: 135px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .transactions-detail .table > :not(caption) > * > * {
        padding: 10px 0px;
      }

      .transactions-detail .details table thead tr th {
        font-weight: 400;
      }

      .transactions-detail .details .icon-status {
        width: 6px;
        height: 6px;
        border-radius: 999px;
        margin: 9px 6px 0px 20px;
      }

      .transactions-detail .details .icon-status.pending {
        background-color: #febd57;
      }

      .transactions-detail .details .icon-status.success {
        background-color: #1abc9c;
      }

      .transactions-detail .details .icon-status.failed {
        background-color: #fe5761;
      }

      .checkout {
        max-width: 800px;
      }

      .transactions-detail .checkout .label {
        width: 130px;
        padding: 0.5rem;
      }

      .transactions-detail .checkout .label.pending {
        color: #febd57;
        background-color: #ffeed3;
      }

      .transactions-detail .checkout .label.success {
        color: #1abc9c;
        background-color: #b8e9df;
      }

      .transactions-detail .checkout .label.failed {
        color: #fe5761;
        background-color: #ffc6c9;
      }

      .transactions-detail .checkout .img-fluid {
        max-width: 100%;
        height: auto;
        border-radius: 1.625rem;
      }

      .transactions-detail .checkout .cropped {
        position: relative;
        width: 110px;
        height: 140px;
        overflow: hidden;
        border-radius: 1.625rem;
      }

      .transactions-detail .checkout hr {
        margin: 0;
        background-color: #e7eaf5;
        border: 0;
        opacity: 1;
      }

      .transactions-detail .checkout span.purchase-details,
      .transactions-detail .checkout span.payment-details {
        display: block;
        font-weight: 500;
      }

      .transactions-detail .checkout .btn-whatsapp {
        padding: 0.75rem 2.875rem;
        background-color: #4d17e2;
      }

      .transactions-detail .checkout .img-checkout {
        width: 110px;
        height: 140px;
      }

      @media (min-width: 768px) {
        .transactions-detail .checkout span.purchase-details,
        .transactions-detail .checkout span.payment-details {
          float: right;
        }

        .transactions-detail .checkout .cropped {
          width: 200px;
          height: 130px;
          overflow: hidden;
          border-radius: 1.625rem;
        }
      }

      @media (max-width: 992px) {
        .transactions-detail main.main-wrapper {
          width: 100%;
        }
      }
    `}</style>
  </>
);

export default MemberTransactionDetails;
