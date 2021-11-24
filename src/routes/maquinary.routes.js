import {
  getAllMaquinary,
  updateMaquinary,
} from "../controllers/maquinary.controllers";

const router = require("express").Router();

router.get("/api/maquinary", getAllMaquinary);

router.put("/api/maquinary/:codigo_equipo", updateMaquinary);

module.exports = router;
