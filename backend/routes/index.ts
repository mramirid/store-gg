import express from "express";
import createHttpError from "http-errors";

const indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", function (_, res) {
  const response = new createHttpError.ImATeapot();
  res.status(response.statusCode).json(response);
});

export default indexRouter;
