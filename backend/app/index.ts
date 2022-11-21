import compression from "compression";
import cors from "cors";
import express from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import logger from "morgan";
import path from "path";
import adminRouter from "./admin.router";

const app = express();

app.use(cors());

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

app.use(
  "/admin-lte",
  express.static(path.resolve("node_modules", "admin-lte"))
);
app.use(express.static(path.resolve("public")));

app.use(logger("dev"));

app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRouter);

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
