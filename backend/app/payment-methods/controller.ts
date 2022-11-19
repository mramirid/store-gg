import type express from "express";
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
  // viewEditPaymentMethod,
  // editPaymentMethod,
  // deletePaymentMethod,
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
    message: "Payment Method added",
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

// const nominal404Error = new createHttpError.NotFound("Nominal not found.");

// async function viewEditNominal(
//   req: express.Request<{ id: string }>,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   let nominal: NominalDoc;

//   try {
//     nominal = await Nominal.findById(req.params.id).orFail(nominal404Error);
//   } catch (error) {
//     next(error);
//     return;
//   }

//   renderViewEditNominal(res, {
//     nominal,
//     formData: nominal.toObject(),
//     formErrors: undefined,
//   });
// }

// export async function editNominal(
//   req: express.Request<{ id: string }, unknown, CreateNominalReqBody>,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   let nominal: NominalDoc;
//   let editedNominal: NominalDoc;

//   try {
//     [nominal, editedNominal] = await Promise.all([
//       Nominal.findById(req.params.id).orFail(nominal404Error),
//       Nominal.findById(req.params.id).orFail(nominal404Error),
//     ]);
//   } catch (error) {
//     next(error);
//     return;
//   }

//   editedNominal.name = req.body.name;
//   editedNominal.quantity = req.body.quantity;
//   editedNominal.price = new mongoose.Types.Decimal128(String(req.body.price));

//   try {
//     await editedNominal.save();
//   } catch (error) {
//     if (error instanceof mongoose.Error.ValidationError) {
//       renderViewEditNominal(res, {
//         nominal,
//         formData: req.body,
//         formErrors: error.errors,
//       });
//     } else {
//       next(error);
//     }
//     return;
//   }

//   setAlert(req, {
//     message: "Nominal edited",
//     status: AlertStatuses.Success,
//   });
//   res.redirect("/admin/nominals");
// }

// function renderViewEditNominal(
//   res: express.Response,
//   options: {
//     nominal: NominalDoc;
//     formData: CreateNominalReqBody;
//     formErrors: Record<string, Error> | undefined;
//   }
// ) {
//   const alert = _.isObject(options.formErrors)
//     ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
//     : undefined;

//   res.render("admin/nominals/edit", {
//     pageTitle: "Edit Nominal",
//     alert,
//     NOMINAL_NAMES,
//     ...options,
//   });
// }

// async function deleteNominal(
//   req: express.Request<{ id: string }>,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {
//     await Nominal.findByIdAndDelete(req.params.id).orFail(nominal404Error);
//   } catch (error) {
//     if (createHttpError.isHttpError(error)) {
//       setAlert(req, {
//         message: error.message,
//         status: AlertStatuses.Error,
//       });
//       res.redirect("/admin/nominals");
//     } else {
//       next(error);
//     }
//     return;
//   }

//   setAlert(req, {
//     message: "Nominal deleted",
//     status: AlertStatuses.Success,
//   });
//   res.redirect("/admin/nominals");
// }
