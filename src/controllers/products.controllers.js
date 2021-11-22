import { getConnection, sql, queries } from "../database";

export const getAllProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllProducts);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const { codigo_productos } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codigo_proyectos", codigo_productos)
      .query(queries.getOneProduct);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewProduct = async (req, res) => {
  try {
    const dataProduct = req.body.product;
    const dataTalent = req.body.talent;
    const dataSemillero = req.body.semilleros;

    const pool = await getConnection();

    await pool
      .request()
      .input("codigo_productos", sql.Int, dataProduct.codigo_productos)
      .input("nombre_productos", sql.VarChar, dataProduct.nombre_productos)
      .input("descripcion_producto", sql.Text, dataProduct.descripcion_producto)
      .input("link_producto", sql.Text, dataProduct.link_producto)
      .input("aval_autor", sql.Bit, dataProduct.aval_autor)
      .input("tipo_intangible", sql.Bit, dataProduct.tipo_intangible)
      .input("intangible", sql.Text, dataProduct.intangible)

      .input(
        "fecha_registro_producto",
        sql.Date,
        dataProduct.fecha_registro_producto
      )
      .input("codigo_tipologia", sql.Int, dataProduct.codigo_tipologia)
      .input("codigo_proyecto", sql.Int, dataProduct.codigo_proyecto)
      .query(queries.addNewProduct);

    if (dataTalent.length !== 0) {
      dataTalent.map(async (talent) => {
        await pool
          .request()
          .input("nombre_persona", sql.VarChar, talent.nombre_persona)
          .input("objeto_contrato", sql.Text, talent.objeto_contrato)
          .input(
            "fecha_inicio_contrato",
            sql.Date,
            talent.fecha_inicio_contrato
          )
          .input("fecha_fin_contrato", sql.Date, talent.fecha_fin_contrato)
          .input(
            "tiempo_dedicacion_semanal",
            sql.VarChar,
            talent.tiempo_dedicacion_semanal
          )
          .input("genero", sql.VarChar, talent.genero)
          .input(
            "valor_mensual_contrato",
            sql.Int,
            talent.valor_mensual_contrato
          )
          .input("valor_total_contrato", sql.Int, talent.valor_total_contrato)
          .input("sena_sennova", sql.VarChar, talent.sena_sennova)
          .input("codigo_nivel", sql.Int, talent.codigo_nivel)
          .input("codigo_tipo_contrato", sql.Int, talent.codigo_tipo_contrato)
          .input("codigo_rol_sennova", sql.Int, talent.codigo_rol_sennova)
          .input("codigo_rol_proyecto", sql.Int, talent.codigo_rol_proyecto)
          .input(
            "codigo_estado_contrato",
            sql.Int,
            talent.codigo_estado_contrato
          )
          .query(queries.addNewTalent);
      });

      const result = await pool
        .request()
        .query(
          `SELECT TOP ` +
            dataTalent.length +
            ` codigo_talento FROM dbctei.talento_humano ORDER BY codigo_talento DESC`
        );

      result.recordset.map(async (resultado) => {
        await pool
          .request()
          .input("codigo_producto", dataProduct.codigo_productos)
          .input("codigo_talento", resultado.codigo_talento)
          .query(queries.addDetalleProductTalent);
      });
    }

    dataSemillero.forEach(async (semillero) => {
      await pool
        .request()
        .input("codigo_producto", dataProduct.codigo_productos)
        .input("codigo_semillero", semillero.value)
        .query(queries.addDetalleSemilleroProducto);
    });

    res.status(201).json(dataProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { codigo_productos } = req.params;
    const {
      nombre_productos,
      descripcion_producto,
      link_producto,
      tipo_intangible,
      fecha_registro_producto,
      codigo_tipologia,
      codigo_semillero,
      codigo_proyecto,
    } = req.body;

    await pool
      .request()
      .input("codigo_productos", sql.Int, codigo_productos)
      .input("nombre_productos", sql.VarChar, nombre_productos)
      .input("descripcion_producto", sql.Text, descripcion_producto)
      .input("link_producto", sql.Text, link_producto)
      .input("tipo_intangible", sql.Text, tipo_intangible)
      .input("fecha_registro_producto", sql.Date, fecha_registro_producto)
      .input("codigo_tipologia", sql.Int, codigo_tipologia)
      .input("codigo_semillero", sql.Int, codigo_semillero)
      .input("codigo_proyecto", sql.Int, codigo_proyecto)
      .query(queries.editProduct);

    res.status(201).json("actualizado producto número " + codigo_productos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { codigo_productos } = req.params;
    const pool = await getConnection();
    await pool
      .request()
      .input("codigo_proyectos", codigo_productos)
      .query(queries.deleteProduct);

    res.status(201).json("Producto eliminado correctamente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
