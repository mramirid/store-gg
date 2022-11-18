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
import type { BankDoc, IBank } from "./model";
import Bank from "./model";

export default {
  viewBanks,
  viewCreateBank,
  createBank,
  // viewEditBank,
  // editBank,
  // deleteBank,
};

async function viewBanks(
  req: express.Request,
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

  res.render("admin/banks", {
    pageTitle: "Banks",
    alert: getAlert(req),
    banks,
  });
}

function viewCreateBank(_: express.Request, res: express.Response) {
  renderViewCreateBank(res, {
    formData: undefined,
    formErrors: undefined,
  });
}

async function createBank(
  req: express.Request<unknown, unknown, IBank>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Bank.create(req.body);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      renderViewCreateBank(res, {
        formData: req.body,
        formErrors: error.errors,
      });
    } else {
      next(error);
    }
    return;
  }

  setAlert(req, { message: "Bank added", status: AlertStatuses.Success });
  res.redirect("/admin/banks");
}

// type CreateNominalReqBody = Pick<INominal, "name" | "quantity"> & {
//   price: number;
// };

function renderViewCreateBank(
  res: express.Response,
  options: {
    formData: IBank | undefined;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/banks/create", {
    pageTitle: "Create Bank",
    alert,
    ...options,
  });
}

// const nominal404Error = new createHttpError.NotFound("Nominal not found.");

// async function viewEditBank(
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

// export async function editBank(
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

// async function deleteBank(
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
