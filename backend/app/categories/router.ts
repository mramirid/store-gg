import express from "express";
import controller from "./controller";

const categoriesRouter = express.Router();

/* GET home page. */
categoriesRouter.get("/", controller.viewSignup);

export default categoriesRouter;
