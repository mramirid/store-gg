import type express from "express";
import mongoose from "mongoose";
import { FormValidationError } from "../../lib/error";
import { AlertStatuses, getAlert, setAlert } from "../../utils/alert";
import Item, { IItem, ItemDoc, itemNames } from "./model";

async function viewItems(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let items: ItemDoc[];

  try {
    items = await Item.find();
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  res.render("admin/items", {
    pageTitle: "Items",
    alert: getAlert(req),
    items,
  });
}

function viewCreateItem(_: express.Request, res: express.Response) {
  res.render("admin/items/create", {
    pageTitle: "Create Item",
    alert: undefined,
    formData: undefined,
    formErrors: undefined,
    itemNames,
  });
}

async function createItem(
  req: express.Request<unknown, unknown, IItem>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Item.create(req.body);
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      const validationError = new FormValidationError(
        "admin/items/create",
        maybeError
      );
      validationError.addRenderOptions({ pageTitle: "Create Item", itemNames });
      next(validationError);
    } else {
      next(maybeError);
    }
    return;
  }

  setAlert(req, { message: "Item added", status: AlertStatuses.Success });
  res.redirect("/admin/items");
}

// const category404Error = new createHttpError.NotFound("Category not found");

// async function viewEditCategory(
//   req: express.Request<{ id: string }>,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   let category: CategoryDoc;

//   try {
//     category = await Category.findById(req.params.id).orFail(category404Error);
//   } catch (maybeError) {
//     next(maybeError);
//     return;
//   }

//   res.render("admin/categories/edit", {
//     pageTitle: "Edit Category",
//     alert: undefined,
//     formData: category,
//     formErrors: undefined,
//   });
// }

// export async function editCategory(
//   req: express.Request<{ id: string }, unknown, ICategory>,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {
//     const category = await Category.findById(req.params.id).orFail(
//       category404Error
//     );
//     category.name = req.body.name;
//     await category.save();
//   } catch (maybeError) {
//     if (maybeError instanceof mongoose.Error.ValidationError) {
//       const validationError = new ValidationError(
//         "admin/categories/edit",
//         "Edit Category",
//         maybeError
//       );
//       next(validationError);
//     } else {
//       next(maybeError);
//     }
//     return;
//   }

//   setAlert(req, {
//     message: "Category edited",
//     status: AlertStatuses.Success,
//   });
//   res.redirect("/admin/categories");
// }

// async function deleteCategory(
//   req: express.Request<{ id: string }>,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {
//     await Category.findByIdAndDelete(req.params.id).orFail(category404Error);
//   } catch (maybeError) {
//     next(maybeError);
//     return;
//   }

//   setAlert(req, {
//     message: "Category deleted",
//     status: AlertStatuses.Success,
//   });
//   res.redirect("/admin/categories");
// }

export default {
  viewItems,
  viewCreateItem,
  createItem,
  // viewEditCategory,
  // editCategory,
  // deleteCategory,
};
