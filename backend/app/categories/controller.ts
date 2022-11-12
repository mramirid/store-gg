import type express from "express";
import mongoose from "mongoose";
import { AlertStatuses, getAlert, setAlert } from "../../utils/alert";
import { getValidationErrorMessage } from "../../utils/error";
import Category, { ICategory } from "./model";

async function viewCategories(
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const categories = await Category.find();

    res.render("admin/categories", {
      pageTitle: "Categories",
      categories,
    });
  } catch (error) {
    next(error);
  }
}

function viewCreateCategory(req: express.Request, res: express.Response) {
  res.render("admin/categories/create", {
    pageTitle: "Create Category",
    alert: getAlert(req),
    prevInput: undefined,
  });
}

async function createCategory(
  req: express.Request<unknown, unknown, ICategory>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Category.create(req.body);

    setAlert(req, { message: "Category added", status: AlertStatuses.Success });

    res.redirect("/admin/categories");
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      setAlert(req, {
        message: getValidationErrorMessage(maybeError),
        status: AlertStatuses.Error,
      });

      res.render("admin/categories/create", {
        pageTitle: "Create Category",
        alert: getAlert(req),
        prevInput: req.body,
      });

      return;
    }

    next(maybeError);
  }
}

export default { viewCategories, viewCreateCategory, createCategory };
