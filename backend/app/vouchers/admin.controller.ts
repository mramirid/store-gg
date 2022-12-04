import type express from "express";
import type { NextFunction } from "express";
import fs from "fs/promises";
import createHttpError from "http-errors";
import _ from "lodash";
import mongoose from "mongoose";
import path from "path";
import {
  AlertStatuses,
  buildAlert,
  getAlert,
  setAlert,
} from "../../utils/alert";
import { joinErrorMessages } from "../../utils/error";
import Category, { type CategoryDoc } from "../categories/model";
import type { NominalDoc } from "../nominals/model";
import Nominal from "../nominals/model";
import type { VoucherDoc } from "./model";
import Voucher from "./model";

type PopulatedVoucherDoc = mongoose.MergeType<
  VoucherDoc,
  { category: CategoryDoc; nominals: NominalDoc[] }
>;

async function viewVouchers(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let vouchers: PopulatedVoucherDoc[];

  try {
    vouchers = await Voucher.find().populate("category").populate("nominals");
  } catch (error) {
    next(error);
    return;
  }

  res.render("admin/vouchers", {
    pageTitle: "Vouchers",
    alert: getAlert(req),
    vouchers,
  });
}

async function viewCreateVoucher(
  _: express.Request,
  res: express.Response,
  next: NextFunction
) {
  let categories: CategoryDoc[];
  let nominals: NominalDoc[];

  try {
    [categories, nominals] = await Promise.all([
      Category.find(),
      Nominal.find(),
    ]);
  } catch (error) {
    next(error);
    return;
  }

  renderViewCreateVoucher(res, {
    categories,
    nominals,
    formData: undefined,
    formErrors: undefined,
  });
}

type CreateVoucherReqBody = {
  name: string;
  categoryId: string;
  nominalIds: string[];
};

async function createVoucher(
  req: express.Request<
    Record<string, never>,
    Record<string, never>,
    CreateVoucherReqBody
  >,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Voucher.create({
      name: req.body.name,
      category: req.body.categoryId,
      nominals: req.body.nominalIds,
      imageName: req.file?.filename,
    });
  } catch (error) {
    next(error);
    return;
  }

  try {
    if (_.isUndefined(req.file)) {
      throw new TypeError("req.file is undefined");
    }

    await fs.copyFile(
      req.file.path,
      path.resolve("public", "uploads", req.file.filename)
    );
  } catch (error) {
    next(new Error("Cannot save the image file", { cause: error }));
    return;
  }

  setAlert(req, { message: "Voucher added", status: AlertStatuses.Success });
  res.redirect("/admin/vouchers");
}

const createVoucherErrorHandler: express.ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  if (error instanceof mongoose.Error.ValidationError) {
    let categories: CategoryDoc[], nominals: NominalDoc[];

    try {
      [categories, nominals] = await Promise.all([
        Category.find(),
        Nominal.find(),
      ]);
    } catch (error) {
      next(error);
      return;
    }

    renderViewCreateVoucher(res, {
      categories,
      nominals,
      formData: req.body,
      formErrors: error.errors,
    });
    return;
  }

  next(error);
};

function renderViewCreateVoucher(
  res: express.Response,
  options: {
    categories: CategoryDoc[];
    nominals: NominalDoc[];
    formData: CreateVoucherReqBody | undefined;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/vouchers/create", {
    pageTitle: "Create Voucher",
    alert,
    ...options,
  });
}

const voucher404Error = new createHttpError.NotFound("Voucher not found");

async function viewEditVoucher(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  let voucher: VoucherDoc, categories: CategoryDoc[], nominals: NominalDoc[];

  try {
    [voucher, categories, nominals] = await Promise.all([
      Voucher.findById(req.params.id).orFail(voucher404Error),
      Category.find(),
      Nominal.find(),
    ]);
  } catch (error) {
    next(error);
    return;
  }

  renderViewEditVoucher(res, {
    categories,
    nominals,
    voucher,
    formData: {
      name: voucher.name,
      categoryId: voucher.category.toString(),
      nominalIds: voucher.nominals.map(String),
      imageName: voucher.imageName,
    },
    formErrors: undefined,
  });
}

export async function editVoucher(
  req: express.Request<{ id: string }, unknown, CreateVoucherReqBody>,
  res: express.Response,
  next: express.NextFunction
) {
  let voucher: VoucherDoc;

  try {
    voucher = await Voucher.findById(req.params.id).orFail(voucher404Error);
  } catch (error) {
    next(error);
    return;
  }

  voucher.name = req.body.name;
  voucher.category = req.body.categoryId as unknown as mongoose.Types.ObjectId;

  const nominalIds = _.isString(req.body.nominalIds)
    ? [req.body.nominalIds]
    : _.isArray(req.body.nominalIds)
    ? req.body.nominalIds
    : [];
  voucher.nominals = nominalIds as unknown as mongoose.Types.ObjectId[];

  const oldImageName = voucher.imageName;
  if (_.isObject(req.file)) {
    voucher.imageName = req.file.filename;
  }

  try {
    await voucher.save();
  } catch (error) {
    next(error);
    return;
  }

  if (_.isObject(req.file)) {
    await Promise.all([
      fs.unlink(path.resolve("public", "uploads", oldImageName)),
      fs.copyFile(
        req.file.path,
        path.resolve("public", "uploads", req.file.filename)
      ),
    ]);
  }

  setAlert(req, {
    message: "Voucher edited",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/vouchers");
}

const editVoucherErrorHandler: express.ErrorRequestHandler<{
  id: string;
}> = async (error, req, res, next) => {
  if (error instanceof mongoose.Error.ValidationError) {
    let voucher: VoucherDoc, categories: CategoryDoc[], nominals: NominalDoc[];

    try {
      [voucher, categories, nominals] = await Promise.all([
        Voucher.findById(req.params.id).orFail(voucher404Error),
        Category.find(),
        Nominal.find(),
      ]);
    } catch (error) {
      next(error);
      return;
    }

    renderViewEditVoucher(res, {
      voucher,
      categories,
      nominals,
      formData: {
        ...req.body,
        imageName: voucher.imageName,
      },
      formErrors: error.errors,
    });
    return;
  }

  next(error);
};

type EditVoucherReqBody = CreateVoucherReqBody & { imageName: string };

function renderViewEditVoucher(
  res: express.Response,
  options: {
    categories: CategoryDoc[];
    nominals: NominalDoc[];
    voucher: VoucherDoc;
    formData: EditVoucherReqBody;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/vouchers/edit", {
    pageTitle: "Edit Voucher",
    alert,
    ...options,
  });
}

async function deleteVoucher(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const voucher = await Voucher.findByIdAndDelete(req.params.id).orFail(
      voucher404Error
    );
    await fs.unlink(path.resolve("public", "uploads", voucher.imageName));
  } catch (error) {
    if (createHttpError.isHttpError(error) && error.expose) {
      setAlert(req, {
        message: error.message,
        status: AlertStatuses.Error,
      });
      res.redirect("/admin/vouchers");
    } else {
      next(error);
    }
    return;
  }

  setAlert(req, {
    message: "Voucher deleted",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/vouchers");
}

export default {
  viewVouchers,
  viewCreateVoucher,
  createVoucher,
  createVoucherErrorHandler,
  viewEditVoucher,
  editVoucherErrorHandler,
  editVoucher,
  deleteVoucher,
};
