import { Router } from "express";
import controller from "./controller";

const itemsRouter = Router();

itemsRouter.get("/", controller.viewItems);
itemsRouter.get("/create", controller.viewCreateItem);
itemsRouter.post("/", controller.createItem);
itemsRouter.get("/:id/edit", controller.viewEditItem);
itemsRouter.patch("/:id", controller.editItem);
// categoriesRouter.delete("/:id", controller.deleteCategory);

export default itemsRouter;
