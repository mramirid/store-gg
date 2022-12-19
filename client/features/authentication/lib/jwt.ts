import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { isPlainObject } from "lodash-es";
import ms from "ms";

function decodeJwt(token: string) {
  const payload = jwt.decode(token);
  if (!isPlainObject(payload)) {
    throw new TypeError(
      "Failed to decode the token. Expected the payload to be a plain object."
    );
  }
  return payload as JwtPayload;
}

export function saveJwt(token: string) {
  const payload = decodeJwt(token);

  const expirationDate = Number.isInteger(payload.exp)
    ? new Date(ms(`${payload.exp}s`))
    : undefined;

  Cookies.set("jwtToken", token, { expires: expirationDate });
}

type JwtPayload = jwt.JwtPayload & {
  fullName: string;
  email: string;
  avatarName?: string;
  phoneNumber?: string;
};
