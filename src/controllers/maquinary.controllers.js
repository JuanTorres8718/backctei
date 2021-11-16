import { getConnection, sql, queries } from "../database";

export const getAllMaquinary = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllMaquinary);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOneMaquinary = async (req, res) => {
  try {
    const { codigo_equipo } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codigo_equipo", codigo_equipo)
      .query(queries.getOneMaquinary);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateMaquinary = async (req, res) => {
  try {
    const { codigo_equipo } = req.params;

    const {
      descripcion_equipo,
      valor_equipo,
      fecha_compra,
      codigo_tipo_equipo,
      codigo_proyecto,
    } = req.body;

    await pool
      .request()
      .input("descripcion_equipo", sql.VarChar, descripcion_equipo)
      .input("valor_equipo", sql.Int, valor_equipo)
      .input("fecha_compra", sql.Date, fecha_compra)
      .input("codigo_tipo_equipo", sql.Int, codigo_tipo_equipo)
      .input("codigo_proyecto", sql.Int, codigo_proyecto)
      .input("codigo_equipo", sql.Int, codigo_equipo)
      .query(queries.editMaquinary);

    res.status(201).json("actualizado equipo número " + codigo_equipo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
