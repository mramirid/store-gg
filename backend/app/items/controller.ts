import type express from "express";
import createHttpError from "http-errors";
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
  req: express.Request<unknown, unknown, Record<keyof IItem, unknown>>,
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

const item404Error = new createHttpError.NotFound("Item not found");

async function viewEditItem(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  let item: ItemDoc;

  try {
    item = await Item.findById(req.params.id).orFail(item404Error);
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  res.render("admin/items/edit", {
    pageTitle: "Edit Item",
    alert: undefined,
    itemNames,
    formData: item,
    formErrors: undefined,
  });
}

export async function editItem(
  req: express.Request<{ id: string }, unknown, IItem>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const item = await Item.findById(req.params.id).orFail(item404Error);

    item.name = req.body.name;
    item.quantity = req.body.quantity;
    item.price = req.body.price;
    await item.save();
  } catch (maybeError) {
    if (maybeError instanceof mongoose.Error.ValidationError) {
      const validationError = new FormValidationError(
        "admin/items/edit",
        maybeError
      );
      validationError.addRenderOptions({ pageTitle: "Edit Item", itemNames });
      next(validationError);
    } else {
      next(maybeError);
    }
    return;
  }

  setAlert(req, {
    message: "Item edited",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/items");
}

async function deleteItem(
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    await Item.findByIdAndDelete(req.params.id).orFail(item404Error);
  } catch (maybeError) {
    next(maybeError);
    return;
  }

  setAlert(req, {
    message: "Item deleted",
    status: AlertStatuses.Success,
  });
  res.redirect("/admin/items");
}

export default {
  viewItems,
  viewCreateItem,
  createItem,
  viewEditItem,
  editItem,
  deleteItem,
};
