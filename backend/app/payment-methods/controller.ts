import type express from "express";
import createHttpError from "http-errors";
import _ from "lodash";
import mongoose from "mongoose";
import {
  AlertStatuses,
  buildAlert,
  getAlert,
  setAlert,
} from "../../utils/alert";
import { joinErrorMessages } from "../../utils/error";
import type { BankDoc } from "../banks/model";
import Bank from "../banks/model";
import type { PaymentMethodDoc } from "./model";
import PaymentMethod from "./model";

export default {
  viewPaymentMethods,
  viewCreatePaymentMethod,
  createPaymentMethod,
  viewEditPaymentMethod,
  editPaymentMethod,
  deletePaymentMethod,
};

type PopulatedPaymentMethodDoc = mongoose.MergeType<
  PaymentMethodDoc,
  { banks: BankDoc[] }
>;

async function viewPaymentMethods(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let paymentMethods: PopulatedPaymentMethodDoc[];

  try {
    paymentMethods = await PaymentMethod.find().populate("banks");
  } catch (error) {
    next(error);
    return;
  }

  res.render("admin/payment-methods", {
    pageTitle: "Payment Methods",
    alert: getAlert(req),
    paymentMethods,
  });
}

async function viewCreatePaymentMethod(
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let banks: BankDoc[];

  try {
    banks = await Bank.find();
  } catch (error) {
    next(error);
    return;
  }

  renderViewCreatePaymentMethod(res, {
    banks,
    formData: undefined,
    formErrors: undefined,
  });
}

async function createPaymentMethod(
  req: express.Request<unknown, unknown, CreatePaymentMethodReqBody>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await PaymentMethod.create({
      name: req.body.name,
      banks: req.body.bankIds,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let banks: BankDoc[];

      try {
        banks = await Bank.find();
      } catch (error) {
        next(error);
        return;
      }

      renderViewCreatePaymentMethod(res, {
        banks,
        formData: req.body,
        formErrors: error.errors,
      });
    } else {
      next(error);
    }
    return;
  }

  setAlert(req, {
    message: "Payment method added",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/payment-methods");
}

type CreatePaymentMethodReqBody = {
  name: string;
  bankIds: string[];
};

function renderViewCreatePaymentMethod(
  res: express.Response,
  options: {
    banks: BankDoc[];
    formData: CreatePaymentMethodReqBody | undefined;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/payment-methods/create", {
    pageTitle: "Create Payment Method",
    alert,
    ...options,
  });
}

const paymentMethod404Error = new createHttpError.NotFound(
  "Payment method not found."
);

async function viewEditPaymentMethod(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  let paymentMethod: PaymentMethodDoc, banks: BankDoc[];

  try {
    [paymentMethod, banks] = await Promise.all([
      PaymentMethod.findById(req.params.id).orFail(paymentMethod404Error),
      Bank.find(),
    ]);
  } catch (error) {
    next(error);
    return;
  }

  renderViewEditPaymentMethod(res, {
    banks,
    paymentMethod,
    formData: {
      name: paymentMethod.name,
      bankIds: paymentMethod.banks.map(String),
    },
    formErrors: undefined,
  });
}

export async function editPaymentMethod(
  req: express.Request<{ id: string }, unknown, CreatePaymentMethodReqBody>,
  res: express.Response,
  next: express.NextFunction
) {
  let paymentMethod: PaymentMethodDoc;
  let editedPaymentMethod: PaymentMethodDoc;

  try {
    [paymentMethod, editedPaymentMethod] = await Promise.all([
      PaymentMethod.findById(req.params.id).orFail(paymentMethod404Error),
      PaymentMethod.findById(req.params.id).orFail(paymentMethod404Error),
    ]);
  } catch (error) {
    next(error);
    return;
  }

  editedPaymentMethod.name = req.body.name;
  editedPaymentMethod.banks = req.body
    .bankIds as unknown as mongoose.Types.ObjectId[];

  try {
    await editedPaymentMethod.save();
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let banks: BankDoc[];

      try {
        banks = await Bank.find();
      } catch (error) {
        next(error);
        return;
      }

      renderViewEditPaymentMethod(res, {
        banks,
        paymentMethod,
        formData: req.body,
        formErrors: error.errors,
      });
    } else {
      next(error);
    }
    return;
  }

  setAlert(req, {
    message: "Payment method edited",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/payment-methods");
}

function renderViewEditPaymentMethod(
  res: express.Response,
  options: {
    banks: BankDoc[];
    paymentMethod: PaymentMethodDoc;
    formData: CreatePaymentMethodReqBody;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/payment-methods/edit", {
    pageTitle: "Edit Payment Method",
    alert,
    ...options,
  });
}

async function deletePaymentMethod(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await PaymentMethod.findByIdAndDelete(req.params.id).orFail(
      paymentMethod404Error
    );
  } catch (error) {
    if (createHttpError.isHttpError(error) && error.expose) {
      setAlert(req, {
        message: error.message,
        status: AlertStatuses.Error,
      });
      res.redirect("/admin/payment-methods");
    } else {
      next(error);
    }
    return;
  }

  setAlert(req, {
    message: "Payment method deleted",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/payment-methods");
}
