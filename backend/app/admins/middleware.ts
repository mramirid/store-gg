import type express from "express";

function ensureAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect("/admin/sign-in");
}

function ensureUnauthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.isUnauthenticated()) {
    next();
    return;
  }
  res.redirect("/admin");
}

export default { ensureAuthenticated, ensureUnauthenticated };
