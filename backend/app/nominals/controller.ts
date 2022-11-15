import type express from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { FormValidationError } from "../../lib/error";
import { AlertStatuses, getAlert, setAlert } from "../../utils/alert";
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
  res.render("admin/nominals/create", {
    pageTitle: "Create Nominal",
    alert: undefined,
    formData: undefined,
    formErrors: undefined,
    NOMINAL_NAMES,
  });
}

async function createNominal(
  req: express.Request<unknown, unknown, Record<keyof INominal, unknown>>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Nominal.create(req.body);
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      const validationError = new FormValidationError(
        "admin/nominals/create",
        maybeError
      );
      validationError.addRenderOptions({
        pageTitle: "Create Nominal",
        NOMINAL_NAMES,
      });
      next(validationError);
    } else {
      next(maybeError);
    }
    return;
  }

  setAlert(req, { message: "Nominal added", status: AlertStatuses.Success });
  res.redirect("/admin/nominals");
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

  res.render("admin/nominals/edit", {
    pageTitle: "Edit Nominal",
    alert: undefined,
    nominal,
    NOMINAL_NAMES,
    formData: nominal,
    formErrors: undefined,
  });
}

export async function editNominal(
  req: express.Request<{ id: string }, unknown, INominal>,
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
  editedNominal.price = req.body.price;

  try {
    await editedNominal.save();
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      const validationError = new FormValidationError(
        "admin/nominals/edit",
        maybeError
      );
      validationError.addRenderOptions({
        pageTitle: "Edit Nominal",
        nominal,
        NOMINAL_NAMES,
      });
      next(validationError);
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

async function deleteNominal(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Nominal.findByIdAndDelete(req.params.id).orFail(nominal404Error);
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  setAlert(req, {
    message: "Nominal deleted",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/nominals");
}
