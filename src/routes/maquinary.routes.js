import { getAllMaquinary } from "../controllers/maquinary.controllers";

const router = require("express").Router();

router.get("/api/maquinary", getAllMaquinary);

module.exports = router;
