export const queries = {
  //all projects
  getAllProjects: "SELECT * FROM dbctei.proyecto_principal",
  getOneProject:
    "SELECT * FROM dbctei.proyecto_principal WHERE codigo_proyecto = @codigo_proyecto",
  addNewProject:
    "INSERT INTO dbctei.proyecto_principal (codigo_proyecto,nombre_proyecto,presupuesto_solicitado,presupuesto_aprobado,presupuesto_asignado,observacion_general,fecha_inicio_proyecto,fecha_cierre_proyecto,industria_4_0,economia_naranja, politica_institucional, proyecto_financiado, resumen_proyecto,video_proyecto, archivo_proyecto,informe_investigacion, codigo_centro, codigo_ciiu, codigo_disciplina, codigo_estado_proyecto,codigo_linea_programatica, codigo_area_ocde, codigo_subarea_conocimiento, codigo_red_conocimiento) VALUES (@codigo_proyecto, @nombre_proyecto, @presupuesto_solicitado, @presupuesto_aprobado, @presupuesto_asignado, @observacion_general, @fecha_inicio_proyecto, @fecha_cierre_proyecto, @industria_4_0,@economia_naranja, @politica_institucional, @proyecto_financiado, @resumen_proyecto,@video_proyecto, @archivo_proyecto, @informe_investigacion, @codigo_centro, @codigo_ciiu, @codigo_disciplina, @codigo_estado_proyecto, @codigo_linea_programatica, @codigo_area_ocde, @codigo_subarea_conocimiento, @codigo_red_conocimiento)",
  editProject:
    "UPDATE dbctei.proyecto_principal SET nombre_proyecto = @nombre_proyecto,presupuesto_solicitado = @presupuesto_solicitado, presupuesto_aprobado = @presupuesto_aprobado, presupuesto_asignado = @presupuesto_asignado, observacion_general= @observacion_general, fecha_inicio_proyecto = @fecha_inicio_proyecto, fecha_cierre_proyecto = @fecha_cierre_proyecto, industria_4_0 = @industria_4_0, economia_naranja = @economia_naranja, politica_institucional = @politica_institucional,codigo_centro = @codigo_centro, codigo_linea_programatica = @codigo_linea_programatica, codigo_red_conocimiento = @codigo_red_conocimiento, codigo_ciiu = @codigo_ciiu, codigo_area_ocde = @codigo_area_ocde, codigo_subarea_conocimiento = @codigo_subarea_conocimiento, codigo_disciplina = @codigo_disciplina, proyecto_financiado = @proyecto_financiado, resumen_proyecto = @resumen_proyecto, video_proyecto=@video_proyecto, codigo_estado_proyecto = @codigo_estado_proyecto  WHERE codigo_proyecto = @codigo_proyecto",
  deleteProject:
    "DELETE FROM dbctei.proyecto_principal WHERE codigo_proyecto = @codigo_proyecto",
  getIdNameProjec:
    "SELECT codigo_proyecto, nombre_proyecto FROM dbctei.proyecto_principal",

  addValuesProject:
    "UPDATE dbctei.proyecto_principal SET valor_proyecto = @valor_proyecto, valor_servicios_personales = @valor_servicios_personales, valor_compra_equipos = @valor_compra_equipos, valor_software = @valor_software, valor_otros_gastos = @valor_otros_gastos WHERE codigo_proyecto = @codigo_proyecto",

  //all talents
  getAllTalents: "SELECT * FROM dbctei.talento_humano",
  getOneTalent:
    "SELECT * FROM dbctei.talento_humano WHERE codigo_talento = @codigo_talento",
  addNewTalent:
    "INSERT INTO dbctei.talento_humano (nombre_persona, objeto_contrato, fecha_inicio_contrato, fecha_fin_contrato, genero,tiempo_dedicacion_semanal, valor_mensual_contrato, valor_total_contrato, sena_sennova, codigo_nivel, codigo_tipo_contrato, codigo_rol_sennova, codigo_rol_proyecto, codigo_estado_contrato) VALUES (@nombre_persona, @objeto_contrato, @fecha_inicio_contrato, @fecha_fin_contrato, @genero, @tiempo_dedicacion_semanal, @valor_mensual_contrato, @valor_total_contrato, @sena_sennova, @codigo_nivel, @codigo_tipo_contrato, @codigo_rol_sennova, @codigo_rol_proyecto, @codigo_estado_contrato)",
  editTalent:
    "UPDATE dbctei.talento_humano SET nombre_persona = @nombre_persona, objeto_contrato = @objeto_contrato, fecha_inicio_contrato = @fecha_inicio_contrato, fecha_fin_contrato = @fecha_fin_contrato, genero = @genero, tiempo_dedicacion_semanal = @tiempo_dedicacion_semanal, codigo_nivel = @codigo_nivel, codigo_tipo_contrato = @codigo_tipo_contrato, codigo_rol_sennova = @codigo_rol_sennova, codigo_rol_proyecto = @codigo_rol_proyecto, codigo_estado_contrato = @codigo_estado_contrato WHERE codigo_talento = @codigo_talento",
  deleteTalent:
    "DELETE FROM dbctei.talento_humano WHERE codigo_talento = @codigo_talento",

  //all maquinary
  getAllMaquinary: "SELECT * FROM dbctei.registro_equipo",
  getOneMaquinary:
    "SELECT * FROM dbctei.registro_equipo WHERE codigo_equipo = @codigo_equipo",
  addNewMaquinary:
    "INSERT INTO dbctei.registro_equipo (descripcion_equipo, valor_equipo, fecha_compra, codigo_tipo_equipo, codigo_proyecto, codigo_producto) VALUES (@descripcion_equipo, @valor_equipo, @fecha_compra, @codigo_tipo_equipo, @codigo_proyecto, @codigo_producto)",
  editMaquinary:
    "UPDATE dbctei.registro_equipo SET descripcion_equipo = @descripcion_equipo, valor_equipo = @valor_equipo, fecha_compra = @fecha_compra, codigo_tipo_equipo = @codigo_tipo_equipo, codigo_proyecto = @codigo_proyecto, codigo_producto = @codigo_producto WHERE codigo_equipo = @codigo_equipo",
  deleteMaquinary:
    "DELETE FROM dbctei.registro_equipo WHERE codigo_equipo = @codigo_equipo",

  //all products
  getAllProducts: "SELECT * FROM dbctei.productos_principal",
  getOneProduct:
    "SELECT * FROM dbctei.productos_principal WHERE codigo_productos = @codigo_productos",
  addNewProduct:
    "INSERT INTO dbctei.productos_principal (codigo_productos, nombre_productos, descripcion_producto, link_producto, aval_autor, tipo_intangible, intangible, fecha_registro_producto, codigo_tipologia, codigo_proyecto) VALUES (@codigo_productos, @nombre_productos, @descripcion_producto, @link_producto, @aval_autor, @tipo_intangible, @intangible, @fecha_registro_producto, @codigo_tipologia, @codigo_proyecto)",
  editProduct:
    "UPDATE dbctei.productos_principal SET nombre_productos = @nombre_productos, descripcion_producto = @descripcion_producto, link_producto = link_producto, aval_autor = @aval_autor, tipo_intangible = @tipo_intangible, intangible = @intangible,   fecha_registro_producto = @fecha_registro_producto, codigo_tipologia = @codigo_tipologia WHERE codigo_productos = @codigo_productos",
  deleteProduct:
    "DELETE FROM dbctei.productos_principal WHERE codigo_productos = @codigo_productos",

  //table impacto
  getAllImpacto: "SELECT * FROM dbctei.impacto_formacion",

  //users
  getAllUsers:
    "SELECT codigo_usuario, nombre_usuario, correo_electronico, correo_respaldo, fecha_fin_cuenta, codigo_centro, codigo_estado, codigo_rol FROM dbctei.usuarios",
  getAllUserEmail: "SELECT correo_electronico FROM dbctei.usuarios",
  getOneUser:
    "SELECT codigo_usuario, nombre_usuario, correo_electronico, contrasena, codigo_centro, codigo_rol FROM dbctei.usuarios WHERE correo_electronico = @correo_electronico",

  getOneUserConsult:
    "SELECT codigo_usuario, nombre_usuario, correo_electronico, correo_respaldo, fecha_fin_cuenta, codigo_centro, codigo_estado, codigo_rol FROM dbctei.usuarios WHERE codigo_usuario = @codigo_usuario",

  updateUserWithEmail:
    "UPDATE dbctei.usuarios SET nombre_usuario = @nombre_usuario, correo_electronico = @correo_electronico,  correo_respaldo =  @correo_respaldo, fecha_fin_cuenta = @fecha_fin_cuenta, codigo_centro = @codigo_centro, codigo_estado = @codigo_estado, codigo_rol = @codigo_rol WHERE codigo_usuario = @codigo_usuario",

  updateUser:
    "UPDATE dbctei.usuarios SET nombre_usuario = @nombre_usuario, correo_respaldo =  @correo_respaldo, fecha_fin_cuenta = @fecha_fin_cuenta, codigo_centro = @codigo_centro, codigo_estado = @codigo_estado, codigo_rol = @codigo_rol WHERE codigo_usuario = @codigo_usuario",

  addNewUser:
    "INSERT INTO dbctei.usuarios (nombre_usuario, correo_electronico, contrasena, correo_respaldo, fecha_fin_cuenta, codigo_centro, codigo_estado, codigo_rol) VALUES (@nombre_usuario, @correo_electronico, @contrasena, @correo_respaldo, @fecha_fin_cuenta, @codigo_centro, @codigo_estado, @codigo_rol)",

  deleteUser:
    "DELETE FROM dbctei.usuarios WHERE codigo_usuario = @codigo_usuario",

  //detalle project-talent
  addDetalleProjectTalent:
    "INSERT INTO dbctei.detalle_proyecto_talento (codigo_proyecto, codigo_talento) VALUES (@codigo_proyecto, @codigo_talento)",

  //detalle product-talent
  addDetalleProductTalent:
    "INSERT INTO dbctei.detalle_producto_talento (codigo_producto, codigo_talento) VALUES (@codigo_producto, @codigo_talento)",

  //detalle rubro-proyecto
  addDetalleRubroProyecto:
    "INSERT INTO dbctei.detalle_rubro_proyecto (codigo_proyecto, codigo_rubro, valor_rubro) VALUES (@codigo_proyecto, @codigo_rubro, @valor_rubro)",

  //detalle semillero-proyecto
  addDetalleSemilleroProyecto:
    "INSERT INTO dbctei.detalle_semillero_proyecto (codigo_proyecto, codigo_semillero) VALUES (@codigo_proyecto, @codigo_semillero)",

  //detalle semillero-producto
  addDetalleSemilleroProducto:
    "INSERT INTO dbctei.detalle_semillero_producto (codigo_producto, codigo_semillero) VALUES (@codigo_producto, @codigo_semillero)",

  //detalle municipio-proyecto
  addDetalleMunicipioProyecto:
    "INSERT INTO dbctei.detalle_municipio_proyecto (codigo_proyecto, codigo_municipio) VALUES (@codigo_proyecto, @codigo_municipio)",

  //tablas secundarias
  getAllRed: "SELECT * FROM dbctei.red_conocimiento",
  getAllReginal: "SELECT * FROM dbctei.regional",
  getAllTipologiaProducto: "SELECT * FROM dbctei.tipologia_productos",
  getAllDepartamento: "SELECT * FROM dbctei.departamento",
  getAllAreas: "SELECT * FROM dbctei.area_conocimiento_ocde",
  getAllSubareaConocimiento: "SELECT * FROM dbctei.subarea_conocimiento",
  getAllMunicipio: "SELECT * FROM dbctei.municipio",
  getAllCentroFormacion: "SELECT * FROM dbctei.centro_formacion",
  getAllGrupo: "SELECT * FROM dbctei.grupo_investigacion",
  getAllNivelAcademico: "SELECT * FROM dbctei.nivel_academico",
  getAllNivelPrograma: "SELECT * FROM dbctei.nivel_programa",
  getAllRolSennova: "SELECT * FROM dbctei.rol_sennova",
  getAllSemilleros: "SELECT * FROM dbctei.semillero",
  getAllRubros: "SELECT * FROM dbctei.rubros",
  getAllCiiu: "SELECT * FROM dbctei.actividad_ciiu",
  getAllDisciplina: "SELECT * FROM dbctei.disciplina",

  //Estadisticas
  getAllValues:
    "SELECT	SUM(valor_proyecto) as suma_proyectos, SUM(valor_servicios_personales) as suma_servicios, SUM(valor_compra_equipos) as suma_equipos, SUM(valor_otros_gastos) as suma_otros_rubros,SUM(valor_software) as suma_software FROM dbctei.proyecto_principal",

  getCategoriesTalent:
    "SELECT codigo_nivel,codigo_tipo_contrato, codigo_rol_sennova, codigo_rol_proyecto FROM dbctei.talento_humano as tal JOIN dbctei.detalle_proyecto_talento as detalle ON tal.codigo_talento = detalle.codigo_talento",
};
