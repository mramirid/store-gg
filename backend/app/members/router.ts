import { Router } from "express";
import controller from "./controller";

const membersRouter = Router();

membersRouter.get("/homepage", controller.getHomepageData);

export default membersRouter;
