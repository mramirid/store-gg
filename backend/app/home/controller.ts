import type express from "express";

export default { viewHome };

function viewHome(_: express.Request, res: express.Response) {
  res.render("admin", { pageTitle: "Home" });
}
