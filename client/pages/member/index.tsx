import MemberOverviewContent from "components/organisms/member-overview-content";
import MemberSidebar from "components/organisms/member-sidebar";
import { NextPage } from "next";
import Head from "next/head";

const MemberOverview: NextPage = () => (
  <>
    <Head>
      <title>Overview - StoreGG</title>
    </Head>

    <div className="overview overflow-auto">
      <MemberSidebar />
      <MemberOverviewContent />
    </div>

    <style jsx>{`
      .overview {
        background-color: #fbfcfd;
      }
    `}</style>
  </>
);

export default MemberOverview;
