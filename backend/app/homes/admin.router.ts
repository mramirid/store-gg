import { Router } from "express";
import controller from "./admin.controller";

const homeAdminRouter = Router();

homeAdminRouter.get("/", controller.viewHome);

export default homeAdminRouter;
