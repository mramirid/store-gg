import type express from "express";

export function ensureAdminAuthenticated(
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

export function ensureAdminUnauthenticated(
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
