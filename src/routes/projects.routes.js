import {
  createNewProjects,
  deleteOneProject,
  getOneProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller";

const router = require("express").Router();

router.get("/api/projects", getProjects);

router.get("/api/project/:codigo_proyecto", getOneProject);

router.post("/api/projects", createNewProjects);

router.put("/api/project/:codigo_proyecto", updateProject);

router.delete("/api/project/:codigo_proyecto", deleteOneProject);

module.exports = router;
