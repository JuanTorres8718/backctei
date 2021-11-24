import { pool } from "mssql";
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
      codigo_producto,
    } = req.body;

    const pool = await getConnection();

    await pool
      .request()
      .input("descripcion_equipo", sql.VarChar, descripcion_equipo)
      .input("valor_equipo", sql.Int, valor_equipo)
      .input("fecha_compra", sql.Date, fecha_compra)
      .input("codigo_tipo_equipo", sql.Int, codigo_tipo_equipo)
      .input("codigo_proyecto", sql.Int, codigo_proyecto)
      .input("codigo_producto", sql.Int, codigo_producto)
      .input("codigo_equipo", sql.Int, codigo_equipo)
      .query(queries.editMaquinary);

    if (codigo_proyecto !== null) {
      const resP = await pool
        .request()
        .query(
          `SELECT valor_proyecto,valor_compra_equipos FROM dbctei.proyecto_principal WHERE codigo_proyecto =${codigo_proyecto}`
        );

      let vProyecto = resP.recordset[0].valor_proyecto;
      let vEquipo = resP.recordset[0].valor_compra_equipos;

      vProyecto = vProyecto - vEquipo + valor_equipo;

      await pool
        .request()
        .query(
          `UPDATE dbctei.proyecto_principal SET valor_proyecto = ${vProyecto}, valor_compra_equipos = ${valor_equipo} WHERE codigo_proyecto=${codigo_proyecto}`
        );
    }

    const result = await pool
      .request()
      .query(
        `SELECT * FROM dbctei.registro_equipo WHERE codigo_equipo =${codigo_equipo}`
      );

    res.status(201).json(result.recordset[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
