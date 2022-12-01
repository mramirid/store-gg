import { Router } from "express";
import controller from "./admin.controller";

const adminCategoriesRouter = Router();

adminCategoriesRouter.get("/", controller.viewCategories);
adminCategoriesRouter.get("/create", controller.viewCreateCategory);
adminCategoriesRouter.post("/", controller.createCategory);
adminCategoriesRouter.get("/:id/edit", controller.viewEditCategory);
adminCategoriesRouter.patch("/:id", controller.editCategory);
adminCategoriesRouter.delete("/:id", controller.deleteCategory);

export default adminCategoriesRouter;
