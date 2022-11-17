import type express from "express";
import type { NextFunction } from "express";
import fs from "fs/promises";
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
  // viewEditVoucher,
  // editVoucher,
  // deleteVoucher,
};

async function viewVouchers(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let vouchers: VoucherDoc[];

  try {
    vouchers = await Voucher.find();
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

// const nominal404Error = new createHttpError.NotFound("Nominal not found");

// async function viewEditNominal(
//   req: express.Request<{ id: string }>,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   let nominal: NominalDoc;

//   try {
//     nominal = await Nominal.findById(req.params.id).orFail(nominal404Error);
//   } catch (maybeError) {
//     next(maybeError);
//     return;
//   }

//   res.render("admin/nominals/edit", {
//     pageTitle: "Edit Nominal",
//     alert: undefined,
//     nominalNames,
//     formData: nominal,
//     formErrors: undefined,
//   });
// }

// export async function editNominal(
//   req: express.Request<{ id: string }, unknown, INominal>,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {
//     const nominal = await Nominal.findById(req.params.id).orFail(
//       nominal404Error
//     );

//     nominal.name = req.body.name;
//     nominal.quantity = req.body.quantity;
//     nominal.price = req.body.price;
//     await nominal.save();
//   } catch (maybeError) {
//     if (maybeError instanceof mongoose.Error.ValidationError) {
//       const validationError = new FormValidationError(
//         "admin/nominals/edit",
//         maybeError
//       );
//       validationError.addRenderOptions({
//         pageTitle: "Edit Nominal",
//         nominalNames,
//       });
//       next(validationError);
//     } else {
//       next(maybeError);
//     }
//     return;
//   }

//   setAlert(req, {
//     message: "Nominal edited",
//     status: AlertStatuses.Success,
//   });
//   res.redirect("/admin/nominals");
// }

// async function deleteNominal(
//   req: express.Request<{ id: string }>,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {
//     await Nominal.findByIdAndDelete(req.params.id).orFail(nominal404Error);
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
