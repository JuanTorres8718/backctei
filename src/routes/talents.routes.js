import { getAllTalents, updateTalent } from "../controllers/talents.controller";

const router = require("express").Router();

router.get("/api/talents", getAllTalents);

router.put("/api/talent/:codigo_talento", updateTalent);

module.exports = router;
