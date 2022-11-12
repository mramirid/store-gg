import express from "express";
import controller from "./controller";

const homeRouter = express.Router();

/* GET home page. */
homeRouter.get("/", controller.viewHome);

export default homeRouter;
