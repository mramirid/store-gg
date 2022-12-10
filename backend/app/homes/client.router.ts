import { Router } from "express";
import { ensureMemberAuthenticated } from "../members/middleware";
import controller from "./client.controller";

const homeClientRouter = Router();

homeClientRouter.get("/", controller.getHomepageData);
homeClientRouter.get(
  "/dashboard",
  ensureMemberAuthenticated,
  controller.getDashboardOverviewData
);

export default homeClientRouter;
