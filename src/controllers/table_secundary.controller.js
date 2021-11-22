import { getConnection, queries } from "../database";

export const getRedConocimiento = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllRed);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRegional = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllReginal);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTipologiaProducto = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllTipologiaProducto);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDepartamento = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllDepartamento);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSubareaConocimiento = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.getAllSubareaConocimiento);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMunicipio = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllMunicipio);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCentroFormacion = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllCentroFormacion);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getGrupo = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllGrupo);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getNivelAcademico = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllNivelAcademico);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRolSennova = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllRolSennova);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getSemilleros = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllSemilleros);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRubros = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllRubros);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProyectos = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getIdNameProjec);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCiiu = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllCiiu);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getDisciplina = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllDisciplina);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
