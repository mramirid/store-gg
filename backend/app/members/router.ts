import { Router } from "express";
import imagesMulter from "../middlewares/images.multer";
import controller from "./controller";

const membersRouter = Router();

membersRouter.post("/", imagesMulter.handleUpload("avatar"), controller.signUp);

export default membersRouter;
