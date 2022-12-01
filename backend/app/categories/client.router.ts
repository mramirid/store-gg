import { Router } from "express";
import controller from "./client.controller";

const clientCategoriesRouter = Router();

clientCategoriesRouter.get("/", controller.getCategories);

export default clientCategoriesRouter;
