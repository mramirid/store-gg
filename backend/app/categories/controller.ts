import type express from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { FormValidationError } from "../../lib/error";
import { AlertStatuses, getAlert, setAlert } from "../../utils/alert";
import Category, { CategoryDoc, ICategory } from "./model";

export default {
  viewCategories,
  viewCreateCategory,
  createCategory,
  viewEditCategory,
  editCategory,
  deleteCategory,
};

async function viewCategories(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let categories: CategoryDoc[];

  try {
    categories = await Category.find();
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  res.render("admin/categories", {
    pageTitle: "Categories",
    alert: getAlert(req),
    categories,
  });
}

function viewCreateCategory(_: express.Request, res: express.Response) {
  res.render("admin/categories/create", {
    pageTitle: "Create Category",
    alert: undefined,
    formData: undefined,
    formErrors: undefined,
  });
}

async function createCategory(
  req: express.Request<unknown, unknown, ICategory>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Category.create(req.body);
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      const validationError = new FormValidationError(
        "admin/categories/create",
        maybeError
      );
      validationError.addRenderOptions({ pageTitle: "Create Category" });
      next(validationError);
    } else {
      next(maybeError);
    }
    return;
  }

  setAlert(req, { message: "Category added", status: AlertStatuses.Success });
  res.redirect("/admin/categories");
}

const category404Error = new createHttpError.NotFound("Category not found");

async function viewEditCategory(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  let category: CategoryDoc;

  try {
    category = await Category.findById(req.params.id).orFail(category404Error);
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  res.render("admin/categories/edit", {
    pageTitle: "Edit Category",
    alert: undefined,
    formData: category,
    formErrors: undefined,
  });
}

export async function editCategory(
  req: express.Request<{ id: string }, unknown, ICategory>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const category = await Category.findById(req.params.id).orFail(
      category404Error
    );
    category.name = req.body.name;
    await category.save();
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      const validationError = new FormValidationError(
        "admin/categories/edit",
        maybeError
      );
      validationError.addRenderOptions({ pageTitle: "Edit Category" });
      next(validationError);
    } else {
      next(maybeError);
    }
    return;
  }

  setAlert(req, {
    message: "Category edited",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/categories");
}

async function deleteCategory(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Category.findByIdAndDelete(req.params.id).orFail(category404Error);
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  setAlert(req, {
    message: "Category deleted",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/categories");
}
