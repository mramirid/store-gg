import type express from "express";

function viewCategories(_: express.Request, res: express.Response) {
  res.render("admin/categories", { pageTitle: "Categories" });
}

export default { viewCategories };
