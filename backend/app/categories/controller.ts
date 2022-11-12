import type express from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { ValidationError } from "../../lib/error";
import { AlertStatuses, setAlert } from "../../utils/alert";
import Category, { CategoryDoc, ICategory } from "./model";

async function viewCategories(
  _: express.Request,
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
    categories,
  });
}

function viewCreateCategory(_: express.Request, res: express.Response) {
  res.render("admin/categories/create", {
    pageTitle: "Create Category",
    formData: undefined,
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
      const validationError = new ValidationError(
        "admin/categories/create",
        "Create Category",
        maybeError
      );
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
    formData: category,
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
      const validationError = new ValidationError(
        "admin/categories/edit",
        "Edit Category",
        maybeError
      );
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

export default {
  viewCategories,
  viewCreateCategory,
  createCategory,
  viewEditCategory,
  editCategory,
};
