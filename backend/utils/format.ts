import _ from "lodash";
import type { Types } from "mongoose";

function toIDR(amount: number | Types.Decimal128) {
  return _.toNumber(amount).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
}

function toReadableNumber(number: number) {
  return number.toLocaleString("id-ID");
}

export default { toIDR, toReadableNumber };
