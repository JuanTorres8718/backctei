import { getConnection, sql, queries } from "../database";

export const getTotalValues = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllValues);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCategoriesTalent = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getCategoriesTalent);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
