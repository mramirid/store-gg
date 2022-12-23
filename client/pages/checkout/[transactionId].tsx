import { StatusCodes } from "http-status-codes";
import _, { isUndefined } from "lodash";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { Fetcher } from "swr";
import LogoIcon from "../../components/LogoIcon";
import { requireSignIn, useJwt } from "../../features/auth";
import {
  CheckoutBillDetails,
  CheckoutConfirmation,
  CheckoutVoucherDetails,
} from "../../features/checkout";
import { ResponseError } from "../../lib/error";
import { getErrorMessage } from "../../utils/error";
import { resolveApiEndpointURL } from "../../utils/format";

const transactionFetcher: Fetcher<Transaction, [string, string]> = async ([
  url,
  jwtToken,
]) => {
  let response: Response;
  try {
    response = await fetch(url, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
  } catch (error) {
    throw new Error("Failed to fetch the transaction. Try again later.", {
      cause: error,
    });
  }

  const resBody = await response.json();

  if (!response.ok) {
    throw new ResponseError(getErrorMessage(resBody), response.status);
  }

  return resBody.transaction;
};

type Transaction = {
  _id: string;
  voucher: {
    name: string;
    imageName: string;
    _id: string;
  };
  category: {
    current: string;
    name: string;
    _id: string;
  };
  nominal: {
    name: string;
    quantity: number;
    price: number;
    _id: string;
  };
  paymentMethod: string;
  targetBank: {
    name: string;
    holderName: string;
    holderNumbers: string;
    _id: string;
  };
  taxRate: number;
  totalPrice: number;
  member: {
    current: string;
    bankAccountName: string;
    gameId: string;
    _id: string;
  };
  status: string;
};

const Checkout: NextPage = () => {
  const router = useRouter();
  const { transactionId } = router.query;

  const jwt = useJwt();

  const { data: transaction, error } = useSWR(
    router.isReady
      ? [resolveApiEndpointURL(`/transactions/${transactionId}`), jwt.token]
      : null,
    transactionFetcher
  );

  if (
    error instanceof ResponseError &&
    error.status === StatusCodes.NOT_FOUND
  ) {
    router.replace("/404");
    return null;
  }

  if (_.isError(error)) {
    throw error;
  }

  if (isUndefined(transaction)) {
    return null;
  }

  if (transaction.status !== "paying") {
    router.replace(`/member/transactions/${transaction._id}`);
    return null;
  }

  return (
    <>
      <Head>
        <title>{`Checkout ${transaction.voucher.name} – StoreGG`}</title>
      </Head>

      <div className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
        <div className="container-fluid">
          <header className="logo text-md-center text-start pb-50">
            <Link href="/" title="Homepage &ndash; StoreGG">
              <LogoIcon />
            </Link>
          </header>
          <main>
            <div className="title-text pt-md-50 pt-0">
              <h1 className="text-4xl fw-bold color-palette-1 mb-10">
                Checkout Details
              </h1>
              <p className="text-lg color-palette-1 mb-0">
                Waktunya meningkatkan cara bermain
              </p>
            </div>
            <CheckoutVoucherDetails
              voucherImageName={transaction.voucher.imageName}
              voucherName={transaction.voucher.name}
              categoryName={transaction.category.name}
            />
            <hr />
            <CheckoutBillDetails
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
            <CheckoutConfirmation transactionId={transactionId as string} />
          </main>
        </div>
      </div>

      <style jsx>{`
        .checkout {
          max-width: 800px;
        }

        hr {
          margin: 0;
          background-color: #e7eaf5;
          border: 0;
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default requireSignIn(Checkout);
