type Props = {
    alumnos: any[];
    onEditar: (alumno: any) => void;
};

/**
 * Componente encargado de mostrar el listado de alumnos registrados.
 *
 * Muestra información clave de cada alumno en columnas
 * fijas y alineadas visualmente.
 */
function AlumnoList({
    alumnos,
    onEditar
}: Props) {

    /**
     * Determina la clase CSS según el estado del alumno.
     */
    const obtenerClaseEstado = (estado: string) => {

        if (estado === "ACTIVO") {
            return "estado-activo";
        }

        if (estado === "DEUDOR") {
            return "estado-deudor";
        }

        return "estado-inactivo";
    };


    return (

        <div className="lista-casa">

            {/* =========================
                HEADER
            ========================= */}

            <div className="lista-casa-header">

                <h2 className="m-0">
                    👥 Alumnos Registrados
                </h2>

            </div>


            {/* =========================
                TABLA DE ALUMNOS
            ========================= */}

            <div className="tabla-alumnos">

                {/* =========================
                    ENCABEZADOS
                ========================= */}

                <div className="fila-alumno-lista fila-alumno-lista-header">

                    <div>
                        ALUMNO
                    </div>

                    <div>
                        DNI
                    </div>

                    <div>
                        TELÉFONO
                    </div>

                    <div>
                        DISCIPLINA
                    </div>

                    <div>
                        GRUPO
                    </div>

                    <div>
                        NIVEL
                    </div>

                    <div>
                        ESTADO
                    </div>

                    <div>
                        ACCIÓN
                    </div>

                </div>


                {/* =========================
                    LISTADO
                ========================= */}

                {alumnos.map((a: any) => (

                    <div
                        className="fila-alumno-lista"
                        key={a.id}
                    >

                        {/* Alumno */}

                        <div>

                            <div className="nombre-alumno">
                                {a.apellido} {a.nombre}
                            </div>

                        </div>


                        {/* DNI */}

                        <div>

                            <small>
                                {a.dni || "—"}
                            </small>

                        </div>


                        {/* Teléfono */}

                        <div>

                            <small>
                                {a.telefono || "—"}
                            </small>

                        </div>


                        {/* Disciplina */}

                        <div>

                            <small>
                                {a.disciplina || "—"}
                            </small>

                        </div>


                        {/* Grupo */}

                        <div>

                            <small>
                                {a.grupo || "—"}
                            </small>

                        </div>


                        {/* Nivel */}

                        <div>

                            <small>
                                {a.nivel || "—"}
                            </small>

                        </div>


                        {/* Estado */}

                        <div>

                            <span
                                className={`badge-estado ${obtenerClaseEstado(a.estado)}`}
                            >
                                {a.estado}
                            </span>

                        </div>


                        {/* Acción */}

                        <div>

                            <button
                                className="btn-editar"
                                onClick={() => onEditar(a)}
                            >
                                Editar
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default AlumnoList;