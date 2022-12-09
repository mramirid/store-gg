import { Router } from "express";
import controller from "./admin.controller";

const categoriesAdminRouter = Router();

categoriesAdminRouter.get("/", controller.viewCategories);
categoriesAdminRouter.get("/create", controller.viewCreateCategory);
categoriesAdminRouter.post("/", controller.createCategory);
categoriesAdminRouter.get("/:id/edit", controller.viewEditCategory);
categoriesAdminRouter.patch("/:id", controller.editCategory);
categoriesAdminRouter.delete("/:id", controller.deleteCategory);

export default categoriesAdminRouter;
