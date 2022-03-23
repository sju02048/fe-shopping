import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const categoryList = require("../data/category-list.json");

import search from "./search/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", categoryList);
});

router.use("/search", search);

export default router;
