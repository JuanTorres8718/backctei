const {
  getRedConocimiento,
  getRegional,
  getTipologiaProducto,
  getDepartamento,
  getSubareaConocimiento,
  getMunicipio,
  getCentroFormacion,
  getGrupo,
  getNivelAcademico,
  getSemilleros,
  getRolSennova,
  getRubros,
  getProyectos,
  getCiiu,
  getDisciplina,
} = require("../controllers/table_secundary.controller");

const router = require("express").Router();

router.get("/api/table/red_conocimientos", getRedConocimiento);

router.get("/api/table/regionales", getRegional);

router.get("/api/table/tipologias", getTipologiaProducto);

router.get("/api/table/departamentos", getDepartamento);

router.get("/api/table/subareas", getSubareaConocimiento);

router.get("/api/table/municipios", getMunicipio);

router.get("/api/table/centros_formaciones", getCentroFormacion);

router.get("/api/table/grupos", getGrupo);

router.get("/api/table/nivel_academico", getNivelAcademico);

router.get("/api/table/semilleros", getSemilleros);

router.get("/api/table/rol_sennova", getRolSennova);

router.get("/api/table/rubros", getRubros);

router.get("/api/table/proyectos", getProyectos);

router.get("/api/table/ciiu", getCiiu);

router.get("/api/table/disciplina", getDisciplina);

module.exports = router;
