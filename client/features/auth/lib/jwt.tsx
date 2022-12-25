import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { isNull, isObject, isString, isUndefined } from "lodash-es";
import ms from "ms";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "utils/context";
import { resolveApiImageURL } from "utils/format";

const JWT_COOKIE_NAME = "jwt-token";

const [useContext, Provider] =
  createContext<{
    token: string | null;
    payload: JwtPayload | null;

    /** `true` if the token has been retrieved from cookie, no matter if it is found or not. */
    isReady: boolean;

    /** `true` if the payload is not null. */
    hasToken: boolean;

    setToken: (token: string) => void;
    removeToken: () => void;
  }>();

export { useContext as useJwt };

export function JwtProvider(props: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const token = Cookies.get(JWT_COOKIE_NAME);
    setToken(token ?? null);
  });

  const setTokenHandler = (token: string) => {
    saveJwtAsCookie(token);
    setToken(token);
  };

  const removeTokenHandler = () => {
    Cookies.remove(JWT_COOKIE_NAME);
    setToken(undefined);
  };

  const isReady = !isUndefined(token);

  const payload = isString(token) ? decodeJwt(token) : null;

  const hasToken = isObject(payload);

  return (
    <Provider
      value={{
        token: token ?? null,
        payload,
        isReady,
        hasToken,
        setToken: setTokenHandler,
        removeToken: removeTokenHandler,
      }}
    >
      {props.children}
    </Provider>
  );
}

function decodeJwt(token: string): JwtPayload {
  const decodedPayload = jwt.decode(token) as string | RawJwtPayload | null;

  if (isString(decodedPayload) || isNull(decodedPayload)) {
    throw new TypeError(
      "Failed to decode the token. Expected the payload to be a plain object."
    );
  }

  return {
    sub: decodedPayload.sub,
    exp: decodedPayload.exp,
    fullName: decodedPayload.fullName,
    email: decodedPayload.email,
    phoneNumber: decodedPayload.phoneNumber,
    avatarUrl:
      decodedPayload.avatarName &&
      resolveApiImageURL(decodedPayload.avatarName),
  };
}

type RawJwtPayload = {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  fullName: string;
  email: string;
  avatarName: string | undefined;
  phoneNumber: string | undefined;
};

export type JwtPayload = { avatarUrl: string | undefined } & Pick<
  RawJwtPayload,
  "sub" | "exp" | "fullName" | "email" | "phoneNumber"
>;

/**
 * Client side only. Do not use this on the server side.
 * @param token The JWT token
 */
function saveJwtAsCookie(token: string) {
  const payload = decodeJwt(token);

  const expirationDate = Number.isInteger(payload.exp)
    ? new Date(ms(`${payload.exp}s`))
    : undefined;

  Cookies.set(JWT_COOKIE_NAME, token, { expires: expirationDate });
}
