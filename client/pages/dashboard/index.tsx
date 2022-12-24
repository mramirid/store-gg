import { requireSignIn } from "features/auth";
import {
  LatestTransactions,
  Sidebar,
  TopUpCategories,
} from "features/dashboard";
import type { NextPage } from "next";
import Head from "next/head";

const DashboardOverview: NextPage = () => (
  <>
    <Head>
      <title>Overview &ndash; StoreGG</title>
    </Head>

    <div className="overview overflow-auto">
      <Sidebar />
      <main className="ps-lg-0">
        <h1 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h1>
        <TopUpCategories className="mb-30" />
        <LatestTransactions />
      </main>
    </div>

    <style jsx>{`
      .overview {
        background-color: #fbfcfd;
      }

      main {
        margin-left: 340px;
        height: 100%;
        margin-right: auto;
        position: relative;
        padding: 50px 50px 50px 0px;
        max-width: 900px;
      }

      @media (max-width: 992px) {
        main {
          width: 100%;
        }
      }
    `}</style>
  </>
);

export default requireSignIn(DashboardOverview);
