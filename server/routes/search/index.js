import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const searchKeyword = require("../../data/search-keyword.json");

const router = express.Router();

router.get(`/`, (req, res) => {
  res.json(searchKeyword);
});

// 검색 URI=> /search/keyword=아이스크림 , GET
router.get(`/keyword=:currentKeyword`, (req, res) => {
  const currentKeyword = req.params.currentKeyword;
  throw searchKeyword[currentKeyword]
    ? res.json(searchKeyword[currentKeyword])
    : new Error("서버에 등록되지 않은 키워드");
});

export default router;
