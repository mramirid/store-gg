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
  renderViewCreateCategory(res, {
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
      renderViewCreateCategory(res, {
        formData: req.body,
        formErrors: maybeError.errors,
      });
    } else {
      next(maybeError);
    }
    return;
  }

  setAlert(req, { message: "Category added", status: AlertStatuses.Success });
  res.redirect("/admin/categories");
}

function renderViewCreateCategory(
  res: express.Response,
  options: {
    formData: ICategory | undefined;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/categories/create", {
    pageTitle: "Create Category",
    alert,
    ...options,
  });
}

const category404Error = new createHttpError.NotFound("Category not found.");

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

  renderViewEditCategory(res, {
    category,
    formData: category,
    formErrors: undefined,
  });
}

export async function editCategory(
  req: express.Request<{ id: string }, unknown, ICategory>,
  res: express.Response,
  next: express.NextFunction
) {
  let category: CategoryDoc;
  let editedCategory: CategoryDoc;

  try {
    [category, editedCategory] = await Promise.all([
      Category.findById(req.params.id).orFail(category404Error),
      Category.findById(req.params.id).orFail(category404Error),
    ]);
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  editedCategory.name = req.body.name;

  try {
    await editedCategory.save();
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      renderViewEditCategory(res, {
        category,
        formData: req.body,
        formErrors: maybeError.errors,
      });
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

function renderViewEditCategory(
  res: express.Response,
  options: {
    category: CategoryDoc;
    formData: ICategory;
    formErrors: Record<string, Error> | undefined;
  }
) {
  const alert = _.isObject(options.formErrors)
    ? buildAlert(joinErrorMessages(options.formErrors), AlertStatuses.Error)
    : undefined;

  res.render("admin/categories/edit", {
    pageTitle: "Edit Category",
    alert,
    ...options,
  });
}

async function deleteCategory(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Category.findByIdAndDelete(req.params.id).orFail(category404Error);
  } catch (maybeError) {
    if (createHttpError.isHttpError(maybeError)) {
      setAlert(req, {
        message: maybeError.message,
        status: AlertStatuses.Error,
      });
      res.redirect("/admin/categories");
    } else {
      next(maybeError);
    }
    return;
  }

  setAlert(req, {
    message: "Category deleted",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/categories");
}
