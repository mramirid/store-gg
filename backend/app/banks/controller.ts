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
import Bank, { BankDoc, TBank, BANK_NAMES } from "./model";

export default {
  viewBanks,
  viewCreateBank,
  createBank,
  viewEditBank,
  editBank,
  deleteBank,
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
  req: express.Request<unknown, unknown, TBank>,
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

function renderViewCreateBank(
  res: express.Response,
  options: {
    formData: TBank | undefined;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/banks/create", {
    pageTitle: "Create Bank",
    alert,
    BANK_NAMES,
    ...options,
  });
}

const bank404Error = new createHttpError.NotFound("Bank not found.");

async function viewEditBank(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  let bank: BankDoc;

  try {
    bank = await Bank.findById(req.params.id).orFail(bank404Error);
  } catch (error) {
    next(error);
    return;
  }

  renderViewEditBank(res, {
    bank,
    formData: bank.toObject(),
    formErrors: undefined,
  });
}

export async function editBank(
  req: express.Request<{ id: string }, unknown, TBank>,
  res: express.Response,
  next: express.NextFunction
) {
  let bank: BankDoc;
  let editedBank: BankDoc;

  try {
    [bank, editedBank] = await Promise.all([
      Bank.findById(req.params.id).orFail(bank404Error),
      Bank.findById(req.params.id).orFail(bank404Error),
    ]);
  } catch (error) {
    next(error);
    return;
  }

  editedBank.name = req.body.name;
  editedBank.holderName = req.body.holderName;
  editedBank.holderNumbers = req.body.holderNumbers;

  try {
    await editedBank.save();
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      renderViewEditBank(res, {
        bank,
        formData: req.body,
        formErrors: error.errors,
      });
    } else {
      next(error);
    }
    return;
  }

  setAlert(req, {
    message: "Bank edited",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/banks");
}

function renderViewEditBank(
  res: express.Response,
  options: {
    bank: BankDoc;
    formData: TBank;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/banks/edit", {
    pageTitle: "Edit Bank",
    alert,
    BANK_NAMES,
    ...options,
  });
}

async function deleteBank(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Bank.findByIdAndDelete(req.params.id).orFail(bank404Error);
  } catch (error) {
    if (createHttpError.isHttpError(error) && error.expose) {
      setAlert(req, {
        message: error.message,
        status: AlertStatuses.Error,
      });
      res.redirect("/admin/banks");
    } else {
      next(error);
    }
    return;
  }

  setAlert(req, {
    message: "Bank deleted",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/banks");
}
