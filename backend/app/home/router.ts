import { Router } from "express";
import controller from "./controller";

const homeRouter = Router();

/* GET home page. */
homeRouter.get("/", controller.viewHome);

export default homeRouter;
