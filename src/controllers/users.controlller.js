import config from "../config";
import { getConnection, sql, queries } from "../database";
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

export const userEmail = async (req, res) => {
  try {
    const pool = await getConnection();

    const users = await pool.request().query(queries.getAllUserEmail);

    res.json(users.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const pool = await getConnection();
    const user = await pool
      .request()
      .input("correo_electronico", sql.VarChar, req.body.correo_electronico)
      .query(queries.getOneUser);

    if (user.recordset.length === 0) {
      res.status(401).json("Correo electronico incorrecto!");
    } else {
      const bytes = CryptoJs.AES.decrypt(
        user.recordset[0].contrasena,
        config.secret_key
      );
      const originalPassword = bytes.toString(CryptoJs.enc.Utf8);

      if (originalPassword !== req.body.contrasena) {
        res.status(401).json("Contraseña incorrecta!");
      } else {
        const accessToken = jwt.sign(
          {
            id: user.recordset[0].codigo_usuario,
            rol: user.recordset[0].codigo_rol,
          },
          config.secret_key,
          { expiresIn: "1d" }
        );

        const { contrasena, ...info } = user.recordset[0];

        res.status(200).json({ ...info, accessToken });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const users = async (req, res) => {
  try {
    const pool = await getConnection();

    const users = await pool.request().query(queries.getAllUsers);
    res.json(users.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getOneUser = async (req, res) => {
  try {
    const { codigo_usuario } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codigo_usuario", codigo_usuario)
      .query(queries.getOneUserConsult);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const registerUser = async (req, res) => {
  try {
    const user = req.body;

    const pool = await getConnection();

    await pool
      .request()
      .input("nombre_usuario", sql.VarChar, user.nombre_usuario)
      .input("correo_electronico", sql.VarChar, user.correo_electronico)
      .input(
        "contrasena",
        sql.VarChar,
        CryptoJs.AES.encrypt(user.contrasena, config.secret_key).toString()
      )
      .input("correo_respaldo", sql.VarChar, user.correo_respaldo)
      .input("fecha_fin_cuenta", sql.Date, user.fecha_fin_cuenta)
      .input("codigo_centro", sql.Int, user.codigo_centro)
      .input("codigo_estado", sql.Int, user.codigo_estado)
      .input("codigo_rol", sql.Int, user.codigo_rol)
      .query(queries.addNewUser);

    const userFinal = await pool
      .request()
      .query(
        `SELECT TOP 1 * FROM dbctei.usuarios ORDER BY codigo_usuario DESC`
      );
    const { contrasena, fecha_fin_cuenta, ...info } = userFinal.recordset[0];
    res.status(201).json(info);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { codigo_usuario } = req.params;

    const user = req.body;

    const pool = await getConnection();

    if (user.checked === undefined) {
      await pool
        .request()
        .input("nombre_usuario", sql.VarChar, user.nombre_usuario)
        .input("correo_respaldo", sql.VarChar, user.correo_respaldo)
        .input("fecha_fin_cuenta", sql.Date, user.fecha_fin_cuenta)
        .input("codigo_centro", sql.Int, user.codigo_centro)
        .input("codigo_estado", sql.Int, user.codigo_estado)
        .input("codigo_rol", sql.Int, user.codigo_rol)
        .input("codigo_usuario", sql.Int, codigo_usuario)
        .query(queries.updateUser);

      const userFinal = await pool
        .request()
        .query(
          `SELECT * FROM dbctei.usuarios WHERE codigo_usuario= ${codigo_usuario} `
        );
      const { contrasena, fecha_fin_cuenta, ...info } = userFinal.recordset[0];
      res.status(201).json(info);
    } else {
      await pool
        .request()
        .input("nombre_usuario", sql.VarChar, user.nombre_usuario)
        .input("correo_electronico", sql.VarChar, user.correo_electronico)
        .input("correo_respaldo", sql.VarChar, user.correo_respaldo)
        .input("fecha_fin_cuenta", sql.Date, user.fecha_fin_cuenta)
        .input("codigo_centro", sql.Int, user.codigo_centro)
        .input("codigo_estado", sql.Int, user.codigo_estado)
        .input("codigo_rol", sql.Int, user.codigo_rol)
        .input("codigo_usuario", sql.Int, codigo_usuario)
        .query(queries.updateUserWithEmail);

      const userFinal = await pool
        .request()
        .query(
          `SELECT * FROM dbctei.usuarios WHERE codigo_usuario= ${codigo_usuario} `
        );
      const { contrasena, fecha_fin_cuenta, ...info } = userFinal.recordset[0];
      res.status(201).json(info);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { codigo_usuario } = req.params;

    const pool = await getConnection();
    await pool
      .request()
      .input("codigo_usuario", sql.Int, codigo_usuario)
      .query(queries.deleteUser);

    res.status(204).json("eliminado");
  } catch (error) {
    console.log(error);
    res.status(500).json(err);
  }
};
