import compression from "compression";
import express from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import logger from "morgan";
import path from "path";
import adminRouter from "./admin.router";
import clientRouter from "./client.router";

const app = express();

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve("public")));

app.use(logger("dev"));

app.use(compression());

app.use("/admin", adminRouter);
app.use("/api/v1", clientRouter);

// catch 404 and forward to error handler
app.use((_, __, next) => next(createError(404)));

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: express.ErrorRequestHandler = (error, req, res, _) => {
  // set locals, only providing error in development
  res.locals["message"] = error.message;
  res.locals["error"] = req.app.get("env") === "development" ? error : {};

  // render the error page
  res.status(error.status ?? StatusCodes.INTERNAL_SERVER_ERROR).render("error");
};
app.use(errorHandler);

export default app;
