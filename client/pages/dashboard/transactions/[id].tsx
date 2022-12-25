import { requireSignIn, useJwt } from "features/auth";
import { Sidebar, TransactionVoucherDetails } from "features/dashboard";
import { TransactionBillDetails, useTransaction } from "features/transaction";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "lib/error";
import { isError, isUndefined } from "lodash-es";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { getErrorMessage } from "utils/error";

const DashboardTransactionDetails: NextPage = () => (
  <>
    <Head>
      <title>Transaction #GG001 &ndash; StoreGG</title>
    </Head>

    <section className="transactions-detail overflow-auto">
      <Sidebar />
      <Content />
    </section>

    <style jsx>{`
      .transactions-detail {
        background-color: #fbfcfd;
      }
    `}</style>
  </>
);

export default requireSignIn(DashboardTransactionDetails);

function Content() {
  const router = useRouter();
  const transactionId = router.query["id"] as string;

  const jwt = useJwt();

  const { isLoading, transaction, error } = useTransaction({
    shouldFetch: jwt.isReady && router.isReady,
    id: transactionId,
    jwtToken: jwt.token as string,
  });

  if (
    error instanceof ResponseError &&
    error.status === StatusCodes.NOT_FOUND
  ) {
    router.replace("/404");
    return null;
  }

  if (isError(error)) {
    toast.error(getErrorMessage(error), { toastId: transactionId });
    return null;
  }

  if (isLoading || isUndefined(transaction)) {
    return null;
  }

  return (
    <main>
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">
          Details #{transaction._id}
        </h2>
        <div className="main-content main-content-card overflow-auto">
          <section className="transaction mx-auto">
            <TransactionVoucherDetails
              imageName={transaction.voucher.imageName}
              name={transaction.voucher.name}
              category={transaction.category.name}
              status={transaction.status}
            />
            <hr />
            <TransactionBillDetails
              memberGameId={transaction.member.gameId}
              transactionId={transaction._id}
              nominalQuantity={transaction.nominal.quantity}
              nominalName={transaction.nominal.name}
              nominalPrice={transaction.nominal.price}
              taxRate={transaction.taxRate}
              totalPrice={transaction.totalPrice}
              bankAccountName={transaction.member.bankAccountName}
              paymentMethod={transaction.paymentMethod}
              targetBankName={transaction.targetBank.name}
              targetBankHolderName={transaction.targetBank.holderName}
              targetBankHolderNumbers={transaction.targetBank.holderNumbers}
            />
            <div className="d-md-block d-flex flex-column w-100">
              {transaction.status === "paying" ? (
                <Link href={`/checkout/${transaction._id}`}>
                  <button className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg">
                    Confirm My Payment
                  </button>
                </Link>
              ) : (
                <a
                  className="btn btn-whatsapp rounded-pill fw-medium text-white border-0 text-lg"
                  aria-label="Chat admin on WhatsApp"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://wa.me/6287XXXXXXXXX?text=${encodeURIComponent(
                    `Hello, I have made a payment for order id #${transactionId}. Please verify it.`
                  )}`}
                >
                  WhatsApp to Admin
                </a>
              )}
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
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

        .transaction {
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
    </main>
  );
}
