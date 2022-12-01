import type express from "express";
import { StatusCodes } from "http-status-codes";
import Category, { CategoryDoc } from "./model";

export default { getCategories };

async function getCategories(
  _: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let categories: CategoryDoc[];

  try {
    categories = await Category.find().select("name");
  } catch (error) {
    next(error);
    return;
  }

  res.status(StatusCodes.OK).json({ categories });
}
