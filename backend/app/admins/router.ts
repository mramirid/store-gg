import { Router } from "express";
import controller from "./controller";
import middleware from "./middleware";
import adminPassport from "./passport";

const adminsRouter = Router();

adminsRouter.post(
  "/sign-out",
  middleware.ensureAuthenticated,
  controller.signOut
);

adminsRouter.get(
  "/sign-up",
  middleware.ensureUnauthenticated,
  controller.viewSignUp
);
adminsRouter.post(
  "/sign-up",
  middleware.ensureUnauthenticated,
  controller.signUp,
  controller.signUpErrorHandler
);

adminsRouter.get(
  "/sign-in",
  middleware.ensureUnauthenticated,
  controller.viewSignIn
);
adminsRouter.post(
  "/sign-in",
  middleware.ensureUnauthenticated,
  adminPassport.authenticate("local", {
    successRedirect: "/admin",
    failWithError: true,
    failureFlash: true,
  }),
  controller.signInErrorHandler
);

export default adminsRouter;
