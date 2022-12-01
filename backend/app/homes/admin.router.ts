import { Router } from "express";
import controller from "./admin.controller";

const adminHomeRouter = Router();

adminHomeRouter.get("/", controller.viewHome);

export default adminHomeRouter;
