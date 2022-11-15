import { Router } from "express";
import controller from "./controller";

const nominalsRouter = Router();

nominalsRouter.get("/", controller.viewNominals);
nominalsRouter.get("/create", controller.viewCreateNominal);
nominalsRouter.post("/", controller.createNominal);
nominalsRouter.get("/:id/edit", controller.viewEditNominal);
nominalsRouter.patch("/:id", controller.editNominal);
nominalsRouter.delete("/:id", controller.deleteNominal);

export default nominalsRouter;
