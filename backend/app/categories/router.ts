import express from "express";
import controller from "./controller";

const categoriesRouter = express.Router();

categoriesRouter.get("/", controller.viewCategories);

export default categoriesRouter;
