import { getConnection, sql, queries } from "../database";

export const getAllTalents = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllTalents);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneTalent = async (req, res) => {
  try {
    const { codigo_talento } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codigo_talento", codigo_talento)
      .query(queries.getOneTalent);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateTalent = async (req, res) => {
  try {
    const { codigo_talento } = req.params;

    const {
      nombre_persona,
      objeto_contrato,
      genero,
      fecha_inicio_contrato,
      fecha_fin_contrato,
      tiempo_dedicacion_semanal,
      codigo_nivel,
      codigo_tipo_contrato,
      codigo_rol_sennova,
      codigo_rol_proyecto,
      codigo_estado_contrato,
    } = req.body;

    const pool = await getConnection();

    await pool
      .request()
      .input("nombre_persona", sql.VarChar, nombre_persona)
      .input("objeto_contrato", sql.VarChar, objeto_contrato)
      .input("genero", sql.VarChar, genero)
      .input("fecha_inicio_contrato", sql.Date, fecha_inicio_contrato)
      .input("fecha_fin_contrato", sql.Date, fecha_fin_contrato)
      .input(
        "tiempo_dedicacion_semanal",
        sql.VarChar,
        tiempo_dedicacion_semanal
      )
      .input("codigo_nivel", sql.Int, codigo_nivel)
      .input("codigo_tipo_contrato", sql.Int, codigo_tipo_contrato)
      .input("codigo_rol_sennova", sql.Int, codigo_rol_sennova)
      .input("codigo_rol_proyecto", sql.Int, codigo_rol_proyecto)
      .input("codigo_estado_contrato", sql.Int, codigo_estado_contrato)
      .input("codigo_talento", sql.Int, codigo_talento)
      .query(queries.editTalent);

    const result = await pool
      .request()
      .query(
        `SELECT * FROM dbctei.talento_humano WHERE codigo_talento =${codigo_talento}`
      );

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
