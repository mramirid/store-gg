import { requireSignIn, useJwt } from "features/auth";
import {
  LatestTransactions,
  Sidebar,
  TransactionStatusFilter,
} from "features/dashboard";
import type { Transaction } from "features/transaction";
import { ResponseError } from "lib/error";
import { isError, isString } from "lodash-es";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import type { Fetcher } from "swr";
import useSWR from "swr";
import { getErrorMessage } from "utils/error";
import { formatIDR, resolveApiEndpointURL } from "utils/format";

const DashboardTransactions: NextPage = () => {
  return (
    <>
      <Head>
        <title>Your Transactions &ndash; StoreGG</title>
      </Head>

      <section className="transactions overflow-auto">
        <Sidebar />
        <Content />
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

function Content() {
  const jwt = useJwt();

  const params = new URLSearchParams(window.location.search);
  const status = params.get("status") as Transaction["status"] | null;

  const endpointURL = new URL(resolveApiEndpointURL("/transactions"));
  if (isString(status)) {
    endpointURL.searchParams.set("status", status);
  } else {
    endpointURL.searchParams.delete("status");
  }

  const { data, error } = useSWR(
    jwt.isReady ? [endpointURL.toString(), jwt.token] : null,
    fetcher
  );

  if (isError(error)) {
    //! Sometimes it throws "Uncaught TypeError: Cannot read properties of undefined (reading 'content')"
    //! Issue: https://github.com/fkhadra/react-toastify/issues/858
    toast.error(error.message, {
      toastId: endpointURL.toString(),
      updateId: endpointURL.toString(),
    });
  }

  return (
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
            {formatIDR(data?.totalSpent ?? 0)}
          </p>
        </div>

        <div className="row mt-30 mb-20">
          <div className="col-lg-12 col-12">
            <TransactionStatusFilter label="All" status={undefined} />
            <TransactionStatusFilter label="Accepted" status="accepted" />
            <TransactionStatusFilter label="Rejected" status="rejected" />
            <TransactionStatusFilter label="Paying" status="paying" />
            <TransactionStatusFilter label="Verifying" status="verifying" />
          </div>
        </div>

        <LatestTransactions
          transactions={data?.transactions ?? []}
          renderAction={(transactionId) => (
            <Link href={"/dashboard/transactions/" + transactionId}>
              <span className="btn btn-action rounded-pill text-sm">
                Details
              </span>
            </Link>
          )}
        />
      </div>

      <style jsx>{`
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
    </main>
  );
}

const fetcher: Fetcher<
  { totalSpent: number; transactions: Transaction[] },
  [string, string]
> = async ([url, jwtToken]) => {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
  } catch (error) {
    throw new Error("Failed to fetch your transactions. Try again later.", {
      cause: error,
    });
  }

  const resBody = await response.json();

  if (!response.ok) {
    throw new ResponseError(getErrorMessage(resBody), response.status);
  }

  return resBody;
};
