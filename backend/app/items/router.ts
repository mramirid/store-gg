import { Router } from "express";
import controller from "./controller";

const itemsRouter = Router();

itemsRouter.get("/", controller.viewItems);
itemsRouter.get("/create", controller.viewCreateCategory);
itemsRouter.post("/", controller.createItem);
// categoriesRouter.get("/:id/edit", controller.viewEditCategory);
// categoriesRouter.patch("/:id", controller.editCategory);
// categoriesRouter.delete("/:id", controller.deleteCategory);

export default itemsRouter;
