import { getAllTalents } from "../controllers/talents.controller";

const router = require("express").Router();

router.get("/api/talents", getAllTalents);

module.exports = router;
