import { OverviewContent, Sidebar } from "features/dashboard";
import type { NextPage } from "next";
import Head from "next/head";

const MemberOverview: NextPage = () => (
  <>
    <Head>
      <title>Overview - StoreGG</title>
    </Head>

    <div className="overview overflow-auto">
      <Sidebar />
      <OverviewContent />
    </div>

    <style jsx>{`
      .overview {
        background-color: #fbfcfd;
      }
    `}</style>
  </>
);

export default MemberOverview;
