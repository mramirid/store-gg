import { requireSignIn, useJwt } from "features/auth";
import type { TopUpCategory } from "features/dashboard";
import {
  LatestTransactions,
  Sidebar,
  TopUpCategories,
} from "features/dashboard";
import type { Transaction } from "features/transaction";
import { ResponseError } from "lib/error";
import { isError } from "lodash-es";
import type { NextPage } from "next";
import Head from "next/head";
import { toast } from "react-toastify";
import type { Fetcher } from "swr";
import useSWR from "swr";
import { getErrorMessage } from "utils/error";
import { resolveApiEndpointURL } from "utils/format";

const DashboardOverview: NextPage = () => {
  return (
    <>
      <Head>
        <title>Overview &ndash; StoreGG</title>
      </Head>

      <div className="overview overflow-auto">
        <Sidebar />
        <Content />
      </div>

      <style jsx>{`
        .overview {
          background-color: #fbfcfd;
        }
      `}</style>
    </>
  );
};

export default requireSignIn(DashboardOverview);

const endpointURL = resolveApiEndpointURL("/homepage/dashboard");

function Content() {
  const jwt = useJwt();

  const { data, error } = useSWR(
    jwt.isReady ? [endpointURL, jwt.token] : null,
    dashboardOverviewFetcher
  );

  if (isError(error)) {
    toast.error(error.message, { toastId: endpointURL });
  }

  return (
    <main className="ps-lg-0">
      <h1 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h1>
      <TopUpCategories
        className="mb-30"
        categories={data?.topUpCategories ?? []}
      />
      <LatestTransactions transactions={data?.latestTransactions ?? []} />

      <style jsx>{`
        main {
          margin-left: 340px;
          height: 100%;
          margin-right: auto;
          position: relative;
          padding: 50px 50px 50px 0px;
        }

        @media (max-width: 992px) {
          main {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}

const dashboardOverviewFetcher: Fetcher<DashboardOverview, [string, string]> =
  async ([url, jwtToken]) => {
    let response: Response;
    try {
      response = await fetch(url, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
    } catch (error) {
      throw new Error("Failed to fetch the overview data. Try again later.", {
        cause: error,
      });
    }

    const resBody = await response.json();

    if (!response.ok) {
      throw new ResponseError(getErrorMessage(resBody), response.status);
    }

    return resBody;
  };

type DashboardOverview = {
  topUpCategories: TopUpCategory[];
  latestTransactions: Transaction[];
};
