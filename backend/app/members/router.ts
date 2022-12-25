import { Router } from "express";
import imagesMulter from "../middlewares/images.multer";
import controller from "./controller";
import { ensureMemberAuthenticated } from "./middleware";

const membersRouter = Router();

membersRouter.post("/", imagesMulter.handleUpload("avatar"), controller.signUp);
membersRouter.patch(
  "/",
  ensureMemberAuthenticated,
  imagesMulter.handleUpload("avatar"),
  controller.validateEditProfileRequest,
  controller.editProfile
);

membersRouter.post(
  "/sign-in",
  controller.validateSignInRequest,
  controller.signIn
);

export default membersRouter;
