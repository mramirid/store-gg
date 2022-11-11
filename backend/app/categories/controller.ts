import type express from "express";

function viewSignup(_: express.Request, res: express.Response) {
  res.render("index");
}

export default { viewSignup };
