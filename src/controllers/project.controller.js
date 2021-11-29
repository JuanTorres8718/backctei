import { getConnection, sql, queries } from "../database";

export const getProjects = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllProjects);

    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getOneProject = async (req, res) => {
  try {
    const { codigo_proyecto } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("codigo_proyecto", codigo_proyecto)
      .query(queries.getOneProject);

    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createNewProjects = async (req, res) => {
  try {
    const dataProject = req.body.project;
    const dataMaquinary = req.body.maquinary;
    const dataTalent = req.body.talent;
    const dataRubros = req.body.rubros;
    const dataMunicipio = req.body.municipios;
    const dataSemillero = req.body.semilleros;
    const dataFormacion = req.body.formaciones;
    let valor_servicios_personales = 0;
    let valor_otros_gastos = 0;
    let valor_compra_equipos = 0;
    let valor_software = 0;

    const pool = await getConnection();

    await pool
      .request()
      .input("codigo_proyecto", sql.Int, dataProject.codigo_proyecto)
      .input("nombre_proyecto", sql.VarChar, dataProject.nombre_proyecto)
      .input(
        "presupuesto_solicitado",
        sql.Int,
        dataProject.presupuesto_solicitado
      )
      .input("presupuesto_aprobado", sql.Int, dataProject.presupuesto_aprobado)
      .input("presupuesto_asignado", sql.Int, dataProject.presupuesto_asignado)
      .input("observacion_general", sql.Text, dataProject.observacion_general)
      .input(
        "fecha_inicio_proyecto",
        sql.Date,
        dataProject.fecha_inicio_proyecto
      )
      .input(
        "fecha_cierre_proyecto",
        sql.Date,
        dataProject.fecha_cierre_proyecto
      )
      .input("industria_4_0", sql.Text, dataProject.industria_4_0)
      .input("economia_naranja", sql.Text, dataProject.economia_naranja)
      .input(
        "politica_institucional",
        sql.Text,
        dataProject.politica_institucional
      )
      .input("proyecto_financiado", sql.Bit, dataProject.proyecto_financiado)
      .input("resumen_proyecto", sql.Text, dataProject.resumen_proyecto)
      .input("video_proyecto", sql.VarChar, dataProject.video_proyecto)
      .input("archivo_proyecto", sql.VarChar, dataProject.archivo_proyecto)
      .input(
        "informe_investigacion",
        sql.VarChar,
        dataProject.informe_investigacion
      )
      .input(
        "codigo_linea_programatica",
        sql.Int,
        dataProject.codigo_linea_programatica
      )
      .input(
        "codigo_estado_proyecto",
        sql.Int,
        dataProject.codigo_estado_proyecto
      )
      .input("codigo_centro", sql.Int, dataProject.codigo_centro)
      .input("codigo_ciiu", sql.VarChar, dataProject.codigo_ciiu)
      .input("codigo_disciplina", sql.VarChar, dataProject.codigo_disciplina)
      .input("codigo_area_ocde", sql.Int, dataProject.codigo_area_ocde)
      .input(
        "codigo_subarea_conocimiento",
        sql.Int,
        dataProject.codigo_subarea_conocimiento
      )
      .input(
        "codigo_red_conocimiento",
        sql.Int,
        dataProject.codigo_red_conocimiento
      )
      .query(queries.addNewProject);

    dataTalent.map(async (talent) => {
      valor_servicios_personales += talent.valor_total_contrato;
      await pool
        .request()
        .input("nombre_persona", sql.VarChar, talent.nombre_persona)
        .input("objeto_contrato", sql.Text, talent.objeto_contrato)
        .input("fecha_inicio_contrato", sql.Date, talent.fecha_inicio_contrato)
        .input("fecha_fin_contrato", sql.Date, talent.fecha_fin_contrato)
        .input(
          "tiempo_dedicacion_semanal",
          sql.VarChar,
          talent.tiempo_dedicacion_semanal
        )
        .input("genero", sql.VarChar, talent.genero)
        .input("valor_mensual_contrato", sql.Int, talent.valor_mensual_contrato)
        .input("valor_total_contrato", sql.Int, talent.valor_total_contrato)
        .input("sena_sennova", sql.VarChar, talent.sena_sennova)
        .input("codigo_nivel", sql.Int, talent.codigo_nivel)
        .input("codigo_tipo_contrato", sql.Int, talent.codigo_tipo_contrato)
        .input("codigo_rol_sennova", sql.Int, talent.codigo_rol_sennova)
        .input("codigo_rol_proyecto", sql.Int, talent.codigo_rol_proyecto)
        .input("codigo_estado_contrato", sql.Int, talent.codigo_estado_contrato)
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
        .input("codigo_proyecto", dataProject.codigo_proyecto)
        .input("codigo_talento", resultado.codigo_talento)
        .query(queries.addDetalleProjectTalent);
    });

    dataRubros.map(async (rubro) => {
      if (rubro.codigo_rubro === 2040108) {
        valor_software += rubro.valor_rubro;
      } else {
        valor_otros_gastos += rubro.valor_rubro;
      }
      await pool
        .request()
        .input("codigo_proyecto", sql.Int, dataProject.codigo_proyecto)
        .input("codigo_rubro", sql.Int, rubro.codigo_rubro)
        .input("valor_rubro", sql.Int, rubro.valor_rubro)
        .query(queries.addDetalleRubroProyecto);
    });

    if (dataMaquinary) {
      valor_compra_equipos = dataMaquinary.valor_equipo;
      await pool
        .request()
        .input("descripcion_equipo", sql.Text, dataMaquinary.descripcion_equipo)
        .input("valor_equipo", sql.Int, dataMaquinary.valor_equipo)
        .input("fecha_compra", sql.Date, dataMaquinary.fecha_compra)
        .input("codigo_tipo_equipo", sql.Int, dataMaquinary.codigo_tipo_equipo)
        .input("codigo_proyecto", sql.Int, dataProject.codigo_proyecto)
        .input("codigo_producto", null)
        .query(queries.addNewMaquinary);
    }

    let valor_proyecto =
      valor_software +
      valor_compra_equipos +
      valor_otros_gastos +
      valor_servicios_personales;

    await pool
      .request()
      .input("valor_proyecto", valor_proyecto)
      .input("valor_servicios_personales", valor_servicios_personales)
      .input("valor_compra_equipos", valor_compra_equipos)
      .input("valor_software", valor_software)
      .input("valor_otros_gastos", valor_otros_gastos)
      .input("codigo_proyecto", dataProject.codigo_proyecto)
      .query(queries.addValuesProject);

    dataSemillero.map(async (semillero) => {
      await pool
        .request()
        .input("codigo_proyecto", sql.Int, dataProject.codigo_proyecto)
        .input("codigo_semillero", sql.Int, semillero.value)
        .query(queries.addDetalleSemilleroProyecto);
    });

    dataMunicipio.map(async (municipio) => {
      await pool
        .request()
        .input("codigo_proyecto", dataProject.codigo_proyecto)
        .input("codigo_municipio", municipio.value)
        .query(queries.addDetalleMunicipioProyecto);
    });

    dataFormacion.map(async (formacion) => {
      await pool
        .request()
        .input("codigo_proyecto", dataProject.codigo_proyecto)
        .input("codigo_formacion", formacion.value)
        .query(queries.addDetalleFormacionProyecto);
    });

    const project = await pool
      .request()
      .query(
        `SELECT TOP 1 * FROM dbctei.proyecto_principal ORDER BY fecha_creacion DESC`
      );

    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { codigo_proyecto } = req.params;

    const {
      nombre_proyecto,
      presupuesto_solicitado,
      presupuesto_aprobado,
      presupuesto_asignado,
      observacion_general,
      fecha_inicio_proyecto,
      fecha_cierre_proyecto,
      codigo_centro,
      codigo_linea_programatica,
      codigo_red_conocimiento,
      codigo_ciiu,
      codigo_area_ocde,
      codigo_subarea_conocimiento,
      codigo_disciplina,
      proyecto_financiado,
      resumen_proyecto,
      video_proyecto,
      codigo_estado_proyecto,
      industria_4_0,
      economia_naranja,
      politica_institucional,
    } = req.body;

    const pool = await getConnection();

    await pool
      .request()
      .input("nombre_proyecto", sql.VarChar, nombre_proyecto)
      .input("presupuesto_solicitado", sql.Int, presupuesto_solicitado)
      .input("presupuesto_aprobado", sql.Int, presupuesto_aprobado)
      .input("presupuesto_asignado", sql.Int, presupuesto_asignado)
      .input("observacion_general", sql.Text, observacion_general)
      .input("fecha_inicio_proyecto", sql.Date, fecha_inicio_proyecto)
      .input("fecha_cierre_proyecto", sql.Date, fecha_cierre_proyecto)
      .input("industria_4_0", sql.Text, industria_4_0)
      .input("economia_naranja", sql.Text, economia_naranja)
      .input("politica_institucional", sql.Text, politica_institucional)
      .input("codigo_linea_programatica", sql.Int, codigo_linea_programatica)
      .input("codigo_estado_proyecto", sql.Int, codigo_estado_proyecto)
      .input("codigo_centro", sql.Int, codigo_centro)
      .input("proyecto_financiado", sql.Bit, proyecto_financiado)
      .input("resumen_proyecto", sql.Text, resumen_proyecto)
      .input("video_proyecto", sql.VarChar, video_proyecto)
      .input("codigo_area_ocde", sql.Int, codigo_area_ocde)
      .input(
        "codigo_subarea_conocimiento",
        sql.Int,
        codigo_subarea_conocimiento
      )
      .input("codigo_ciiu", sql.VarChar, codigo_ciiu)
      .input("codigo_disciplina", sql.VarChar, codigo_disciplina)
      .input("codigo_red_conocimiento", sql.Int, codigo_red_conocimiento)
      .input("codigo_proyecto", sql.Int, codigo_proyecto)
      .query(queries.editProject);

    const project = await pool
      .request()
      .query(
        `SELECT * FROM dbctei.proyecto_principal WHERE codigo_proyecto = ${codigo_proyecto}`
      );

    res.status(201).json(project.recordset[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteOneProject = async (req, res) => {
  try {
    const { codigo_proyecto } = req.params;
    const pool = await getConnection();
    await pool
      .request()
      .input("codigo_proyecto", codigo_proyecto)
      .query(queries.deleteProject);

    res.status(204).json("proyecto eliminado correctamente");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
