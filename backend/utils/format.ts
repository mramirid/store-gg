import _ from "lodash";
import type { Types } from "mongoose";

function toUSD(amount: number | Types.Decimal128) {
  const formattedAmount = _.toNumber(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formattedAmount;
}

export default { toUSD };
