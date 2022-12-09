import { Router } from "express";
import controller from "./client.controller";

const categoriesClientRouter = Router();

categoriesClientRouter.get("/", controller.getCategories);

export default categoriesClientRouter;
