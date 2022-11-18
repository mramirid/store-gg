import { Router } from "express";
import controller from "./controller";

const banksRouter = Router();

banksRouter.get("/", controller.viewBanks);
banksRouter.get("/create", controller.viewCreateBank);
banksRouter.post("/", controller.createBank);
banksRouter.get("/:id/edit", controller.viewEditBank);
banksRouter.patch("/:id", controller.editBank);
banksRouter.delete("/:id", controller.deleteBank);

export default banksRouter;
