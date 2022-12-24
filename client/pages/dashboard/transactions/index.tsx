import { requireSignIn } from "features/auth";
import { DashboardTransactionsContent, Sidebar } from "features/dashboard";
import type { NextPage } from "next";
import Head from "next/head";

const DashboardTransactions: NextPage = () => {
  return (
    <>
      <Head>
        <title>Your Transactions &ndash; StoreGG</title>
      </Head>

      <section className="transactions overflow-auto">
        <Sidebar />
        <DashboardTransactionsContent />
      </section>

      <style jsx>{`
        .transactions {
          background-color: #fbfcfd;
        }
      `}</style>
    </>
  );
};

export default requireSignIn(DashboardTransactions);
