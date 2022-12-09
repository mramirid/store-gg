import { Router } from "express";
import controller from "./controller";
import {
  ensureAdminAuthenticated,
  ensureAdminUnauthenticated,
} from "./middleware";
import adminPassport from "./passport";

const adminsRouter = Router();

adminsRouter.post("/sign-out", ensureAdminAuthenticated, controller.signOut);

adminsRouter.get("/sign-up", ensureAdminUnauthenticated, controller.viewSignUp);
adminsRouter.post(
  "/sign-up",
  ensureAdminUnauthenticated,
  controller.signUp,
  controller.signUpErrorHandler
);

adminsRouter.get("/sign-in", ensureAdminUnauthenticated, controller.viewSignIn);
adminsRouter.post(
  "/sign-in",
  ensureAdminUnauthenticated,
  adminPassport.authenticate("local", {
    successRedirect: "/admin",
    failWithError: true,
    failureFlash: true,
  }),
  controller.signInErrorHandler
);

export default adminsRouter;
