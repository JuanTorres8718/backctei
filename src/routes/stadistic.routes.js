const {
  getTotalValues,
  getCategoriesTalent,
} = require("../controllers/stadistic.controller");

const router = require("express").Router();

router.get("/api/stadistics/values", getTotalValues);

router.get("/api/stadistics/categories", getCategoriesTalent);

module.exports = router;
