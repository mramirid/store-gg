import express from "express";
import controller from "./controller";

const categoriesRouter = express.Router();

categoriesRouter.get("/", controller.viewCategories);
categoriesRouter.get("/create", controller.viewCreateCategory);
categoriesRouter.post("/", controller.createCategory);
categoriesRouter.get("/:id/edit", controller.viewEditCategory);
categoriesRouter.patch("/:id", controller.editCategory);

export default categoriesRouter;
