import express from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import categoriesRouter from "./categories/router";
import homeRouter from "./home/router";

const adminRouter = express.Router();

adminRouter.use("/", homeRouter);
adminRouter.use("/categories", categoriesRouter);

adminRouter.use((_, __, next) => next(new createHttpError.NotFound()));

const errorHandler: express.ErrorRequestHandler = (error, req, res, next) => {
  if (req.app.get("env") === "development") {
    next(error);
    return;
  }

  if (
    createHttpError.isHttpError(error) &&
    error.status === StatusCodes.NOT_FOUND
  ) {
    res.status(error.status).render("admin/404", {
      pageTitle: "404 Error Page",
      statusCode: error.status,
    });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("admin/5XX", {
    pageTitle: "500s Error Page",
    statusCode: error.status ?? StatusCodes.INTERNAL_SERVER_ERROR,
  });
};
adminRouter.use(errorHandler);

export default adminRouter;
