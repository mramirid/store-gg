import { ResponseError } from "lib/error";
import useSWR, { Fetcher } from "swr";
import { getErrorMessage } from "utils/error";
import { resolveApiEndpointURL } from "utils/format";

export default function useTransaction(args: {
  id: string;
  jwtToken: string;
  shouldFetch: boolean;
}) {
  const endpointURL = resolveApiEndpointURL(`/transactions/${args.id}`);

  const swrResult = useSWR<Transaction, Error>(
    args.shouldFetch ? [endpointURL, args.jwtToken] : null,
    transactionFetcher
  );

  return { transaction: swrResult.data, ...swrResult };
}

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

export type Transaction = {
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
  status: "paying" | "accepted" | "rejected" | "verifying";
};
