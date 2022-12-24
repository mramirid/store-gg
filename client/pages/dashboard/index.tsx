import { requireSignIn, useJwt } from "features/auth";
import {
  LatestTransactions,
  Sidebar,
  TopUpCategories,
} from "features/dashboard";
import type { TopUpCategory } from "features/dashboard/components/TopUpCategories";
import type { Transaction } from "features/transaction";
import { ResponseError } from "lib/error";
import { isError } from "lodash-es";
import type { NextPage } from "next";
import Head from "next/head";
import { toast } from "react-toastify";
import useSWR, { Fetcher } from "swr";
import { getErrorMessage } from "utils/error";
import { resolveApiEndpointURL } from "utils/format";

const endpointURL = resolveApiEndpointURL("/homepage/dashboard");

const DashboardOverview: NextPage = () => {
  const jwt = useJwt();

  const { data, error, isLoading } = useSWR(
    jwt.isReady ? [endpointURL, jwt.token] : null,
    dashboardOverviewFetcher
  );

  if (isLoading) {
    return null;
  }

  if (isError(error)) {
    toast.error(error.message, { toastId: endpointURL });
  }

  return (
    <>
      <Head>
        <title>Overview &ndash; StoreGG</title>
      </Head>

      <div className="overview overflow-auto">
        <Sidebar />
        <main className="ps-lg-0">
          <h1 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h1>
          <TopUpCategories
            className="mb-30"
            categories={data?.topUpCategories ?? []}
          />
          <LatestTransactions transactions={data?.latestTransactions ?? []} />
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
           {
            /* max-width: 900px; */
          }
        }

        @media (max-width: 992px) {
          main {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

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

export default requireSignIn(DashboardOverview);
