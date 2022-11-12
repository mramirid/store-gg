import type express from "express";

function viewHome(_: express.Request, res: express.Response) {
  res.render("admin", { pageTitle: "Home" });
}

export default { viewHome };
