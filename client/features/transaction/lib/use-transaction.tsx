import { useJwt } from "features/auth";
import { ResponseError } from "lib/error";
import { isString } from "lodash-es";
import useSWR, { Fetcher } from "swr";
import { getErrorMessage } from "utils/error";
import { resolveApiEndpointURL } from "utils/format";

export default function useTransaction(id: string | undefined) {
  const jwt = useJwt();

  const endpointURL = resolveApiEndpointURL(`/transactions/${id}`);

  const { data, error } = useSWR<Transaction, Error>(
    isString(id) ? [endpointURL, jwt.token] : null,
    transactionFetcher
  );

  return { transaction: data, error };
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
