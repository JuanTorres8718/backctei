import sql from "mssql";
import config from "../config";

const dbSettings = {
  user: "juan",
  password: "123456",
  server: "localhost",
  database: "dbctei",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.log(error);
  }
}

export { sql };
