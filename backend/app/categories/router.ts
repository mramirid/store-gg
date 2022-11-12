import express from "express";
import controller from "./controller";

const categoriesRouter = express.Router();

categoriesRouter.get("/", controller.viewCategories);
categoriesRouter.get("/create", controller.viewCreateCategory);
categoriesRouter.post("/", controller.createCategory);

export default categoriesRouter;
