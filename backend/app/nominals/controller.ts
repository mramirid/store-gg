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
import Nominal, { INominal, NominalDoc, NOMINAL_NAMES } from "./model";

export default {
  viewNominals,
  viewCreateNominal,
  createNominal,
  viewEditNominal,
  editNominal,
  deleteNominal,
};

async function viewNominals(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let nominals: NominalDoc[];

  try {
    nominals = await Nominal.find();
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  res.render("admin/nominals", {
    pageTitle: "Nominals",
    alert: getAlert(req),
    nominals,
  });
}

function viewCreateNominal(_: express.Request, res: express.Response) {
  renderViewCreateNominal(res, {
    formData: undefined,
    formErrors: undefined,
  });
}

async function createNominal(
  req: express.Request<unknown, unknown, CreateNominalReqBody>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Nominal.create(req.body);
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      renderViewCreateNominal(res, {
        formData: req.body,
        formErrors: maybeError.errors,
      });
    } else {
      next(maybeError);
    }
    return;
  }

  setAlert(req, { message: "Nominal added", status: AlertStatuses.Success });
  res.redirect("/admin/nominals");
}

type CreateNominalReqBody = Pick<INominal, "name" | "quantity"> & {
  price: number;
};

function renderViewCreateNominal(
  res: express.Response,
  options: {
    formData: CreateNominalReqBody | undefined;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/nominals/create", {
    pageTitle: "Create Nominal",
    alert,
    NOMINAL_NAMES,
    ...options,
  });
}

const nominal404Error = new createHttpError.NotFound("Nominal not found.");

async function viewEditNominal(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  let nominal: NominalDoc;

  try {
    nominal = await Nominal.findById(req.params.id).orFail(nominal404Error);
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  renderViewEditNominal(res, {
    nominal,
    formData: nominal.toObject(),
    formErrors: undefined,
  });
}

export async function editNominal(
  req: express.Request<{ id: string }, unknown, CreateNominalReqBody>,
  res: express.Response,
  next: express.NextFunction
) {
  let nominal: NominalDoc;
  let editedNominal: NominalDoc;

  try {
    [nominal, editedNominal] = await Promise.all([
      Nominal.findById(req.params.id).orFail(nominal404Error),
      Nominal.findById(req.params.id).orFail(nominal404Error),
    ]);
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  editedNominal.name = req.body.name;
  editedNominal.quantity = req.body.quantity;
  editedNominal.price = new mongoose.Types.Decimal128(String(req.body.price));

  try {
    await editedNominal.save();
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      renderViewEditNominal(res, {
        nominal,
        formData: req.body,
        formErrors: maybeError.errors,
      });
    } else {
      next(maybeError);
    }
    return;
  }

  setAlert(req, {
    message: "Nominal edited",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/nominals");
}

function renderViewEditNominal(
  res: express.Response,
  options: {
    nominal: NominalDoc;
    formData: CreateNominalReqBody;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/nominals/edit", {
    pageTitle: "Edit Nominal",
    alert,
    NOMINAL_NAMES,
    ...options,
  });
}

async function deleteNominal(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Nominal.findByIdAndDelete(req.params.id).orFail(nominal404Error);
  } catch (maybeError) {
    if (createHttpError.isHttpError(maybeError)) {
      setAlert(req, {
        message: maybeError.message,
        status: AlertStatuses.Error,
      });
      res.redirect("/admin/nominals");
    } else {
      next(maybeError);
    }
    return;
  }

  setAlert(req, {
    message: "Nominal deleted",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/nominals");
}
