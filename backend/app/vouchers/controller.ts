import type express from "express";
import type { NextFunction } from "express";
import fs from "fs/promises";
import createHttpError from "http-errors";
import _ from "lodash";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import {
  AlertStatuses,
  buildAlert,
  getAlert,
  setAlert,
} from "../../utils/alert";
import { joinErrorMessages } from "../../utils/error";
import Category, { type CategoryDoc } from "../categories/model";
import imagesMulter from "../middlewares/images.multer";
import type { NominalDoc } from "../nominals/model";
import Nominal from "../nominals/model";
import type { VoucherDoc } from "./model";
import Voucher from "./model";

export default {
  viewVouchers,
  viewCreateVoucher,
  createVoucher,
  viewEditVoucher,
  editVoucher,
  // deleteVoucher,
};

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
  } catch (maybeError) {
    next(maybeError);
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
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  renderViewCreateVoucher(res, {
    categories,
    nominals,
    formData: undefined,
    formErrors: undefined,
  });
}

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
    await handleImageUpload(req, res, "imageName");

    await Voucher.create({
      name: req.body.name,
      category: req.body.categoryId,
      nominals: req.body.nominalIds,
      imageName: req.file?.filename,
    });
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      let categories: CategoryDoc[], nominals: NominalDoc[];

      try {
        [categories, nominals] = await Promise.all([
          Category.find(),
          Nominal.find(),
        ]);
      } catch (maybeError) {
        next(maybeError);
        return;
      }

      renderViewCreateVoucher(res, {
        categories,
        nominals,
        formData: req.body,
        formErrors: maybeError.errors,
      });
    } else {
      next(maybeError);
    }
    return;
  }

  if (_.isUndefined(req.file)) {
    next(
      new Error("Cannot save the image file", {
        cause: new TypeError("req.file is undefined"),
      })
    );
    return;
  }

  await fs.copyFile(
    req.file.path,
    path.resolve("public", "uploads", req.file.filename)
  );

  setAlert(req, { message: "Voucher added", status: AlertStatuses.Success });
  res.redirect("/admin/vouchers");
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
  } catch (maybeError) {
    next(maybeError);
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

export async function editVoucher(
  req: express.Request<{ id: string }, unknown, CreateVoucherReqBody>,
  res: express.Response,
  next: express.NextFunction
) {
  let voucher: VoucherDoc, editedVoucher: VoucherDoc;

  try {
    [voucher, editedVoucher] = await Promise.all([
      Voucher.findById(req.params.id).orFail(voucher404Error),
      Voucher.findById(req.params.id).orFail(voucher404Error),
    ]);
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  try {
    await handleImageUpload(req, res, "imageName");

    const nominalIds = _.isString(req.body.nominalIds)
      ? [req.body.nominalIds]
      : _.isArray(req.body.nominalIds)
      ? req.body.nominalIds
      : [];

    editedVoucher.name = req.body.name;
    editedVoucher.category = new mongoose.Types.ObjectId(req.body.categoryId);
    editedVoucher.nominals = new mongoose.Types.DocumentArray(nominalIds);

    if (_.isObject(req.file)) {
      editedVoucher.imageName = req.file.filename;
    }

    await editedVoucher.save();
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      let categories: CategoryDoc[], nominals: NominalDoc[];

      try {
        [categories, nominals] = await Promise.all([
          Category.find(),
          Nominal.find(),
        ]);
      } catch (maybeError) {
        next(maybeError);
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
        formErrors: maybeError.errors,
      });
    } else {
      next(maybeError);
    }
    return;
  }

  if (_.isObject(req.file)) {
    await Promise.all([
      fs.unlink(path.resolve("public", "uploads", voucher.imageName)),
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

function handleImageUpload(
  req: express.Request,
  res: express.Response,
  fieldName: string
) {
  const receiveImage = imagesMulter.setupSingleUpload(fieldName);

  return new Promise((resolve, reject) => {
    receiveImage(req, res, (maybeError: unknown) => {
      if (maybeError instanceof multer.MulterError) {
        const validationError = new mongoose.Error.ValidationError();
        validationError.addError(
          fieldName,
          new mongoose.Error.ValidatorError({ message: maybeError.message })
        );
        reject(validationError);
        return;
      }

      if (_.isError(maybeError)) {
        reject(maybeError);
        return;
      }

      resolve(undefined);
    });
  });
}

// async function deleteNominal(
//   req: express.Request<{ id: string }>,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {
//     await Nominal.findByIdAndDelete(req.params.id).orFail(voucher404Error);
//   } catch (maybeError) {
//     next(maybeError);
//     return;
//   }

//   setAlert(req, {
//     message: "Nominal deleted",
//     status: AlertStatuses.Success,
//   });
//   res.redirect("/admin/nominals");
// }
