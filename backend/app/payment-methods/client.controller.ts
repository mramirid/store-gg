import type express from "express";
import { StatusCodes } from "http-status-codes";
import PaymentMethod from "./model";

export default { getPaymentMethods };

async function getPaymentMethods(
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let paymentMethods: unknown;

  try {
    paymentMethods = await PaymentMethod.aggregate()
      .lookup({
        from: "banks",
        localField: "banks",
        foreignField: "_id",
        as: "banks",
      })
      .unwind("$banks")
      .project({
        name: 1,
        bank: {
          _id: "$banks._id",
          name: "$banks.name",
        },
      });
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({ paymentMethods });
}
