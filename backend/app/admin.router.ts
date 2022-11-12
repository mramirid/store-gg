import express from "express";
import { StatusCodes } from "http-status-codes";
import categoriesRouter from "./categories/router";
import homeRouter from "./home/router";

const adminRouter = express.Router();

adminRouter.use("/", homeRouter);

adminRouter.use("/categories", categoriesRouter);

adminRouter.use((_, res) => {
  res.status(StatusCodes.NOT_FOUND).render("admin/404", {
    pageTitle: "404 Not Found",
    statusCode: StatusCodes.NOT_FOUND,
  });
});

const errorHandler: express.ErrorRequestHandler = (error, req, res, next) => {
  if (req.app.get("env") === "development") {
    next(error);
    return;
  }

  const statusCode = error.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).render("admin/error", {
    pageTitle: "Error Page",
    statusCode,
  });
};
adminRouter.use(errorHandler);

export default adminRouter;
