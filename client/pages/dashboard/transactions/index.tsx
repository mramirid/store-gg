import { requireSignIn } from "features/auth";
import { LatestTransactions, Sidebar } from "features/dashboard";
import TransactionStatusFilter from "features/dashboard/components/TransactionStatusFilter";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { formatIDR } from "utils/format";

const DashboardTransactions: NextPage = () => (
  <>
    <Head>
      <title>Your Transactions &ndash; StoreGG</title>
    </Head>

    <section className="transactions overflow-auto">
      <Sidebar />

      <main>
        <div className="ps-lg-0">
          <h1 className="text-4xl fw-bold color-palette-1 mb-30">
            My Transactions
          </h1>

          <div className="mb-30">
            <h2 className="text-lg color-palette-2 mb-12 fw-normal">
              You&rsquo;ve spent
            </h2>
            <p className="text-5xl fw-medium color-palette-1">
              {formatIDR(4_518_000_500)}
            </p>
          </div>

          <div className="row mt-30 mb-20">
            <div className="col-lg-12 col-12">
              <TransactionStatusFilter label="All Trx" />
              <TransactionStatusFilter label="Success" status="success" />
              <TransactionStatusFilter label="Pending" status="pending" />
              <TransactionStatusFilter label="Failed" status="failed" />
            </div>
          </div>
          <LatestTransactions
            transactions={[]}
            renderAction={(transactionId) => (
              <Link href={"/dashboard/transactions/" + transactionId}>
                <span className="btn btn-action rounded-pill text-sm">
                  Details
                </span>
              </Link>
            )}
          />
        </div>
      </main>
    </section>

    <style jsx>{`
      .transactions {
        background-color: #fbfcfd;
      }

      main {
        margin-left: 340px;
        height: 100%;
        margin-right: auto;
        position: relative;
        padding: 50px 50px 50px 0px;
        max-width: 1047px;
      }

      .btn-action {
        display: inline-block;
        width: 112px;
        padding: 0.563rem;
        color: #0c145a;
        background-color: #e7eaf5;
      }

      @media (max-width: 992px) {
        main {
          width: 100%;
        }
      }
    `}</style>
  </>
);

export default requireSignIn(DashboardTransactions);
