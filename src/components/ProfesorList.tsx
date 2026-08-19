type Props = {
    profesores: any[];
    onEditar: (profesor: any) => void;
};

/**
 * Muestra el listado de profesores registrados.
 *
 * Utiliza columnas fijas para mantener
 * la información perfectamente alineada.
 */
function ProfesorList({
    profesores,
    onEditar
}: Props) {

    /**
     * Devuelve la clase CSS correspondiente según el estado.
     */
    const obtenerClaseEstado = (activo: boolean) => {

        if (activo) {
            return "estado-activo";
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
                    👩‍🏫 Profesores Registrados
                </h2>

            </div>


            {/* =========================
                TABLA DE PROFESORES
            ========================= */}

            <div className="tabla-profesores">

                {/* =========================
                    ENCABEZADOS
                ========================= */}

                <div className="fila-profesor fila-profesor-header">

                    <div>
                        PROFESOR
                    </div>

                    <div>
                        ESPECIALIDAD
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

                {profesores.map((p: any) => (

                    <div
                        className="fila-profesor"
                        key={p.id}
                    >

                        {/* Profesor */}

                        <div>

                            <div className="nombre-alumno">

                                {p.apellido} {p.nombre}

                            </div>

                        </div>


                        {/* Especialidad */}

                        <div>

                            <small>
                                {p.especialidad || "—"}
                            </small>

                        </div>


                        {/* Estado */}

                        <div>

                            <span
                                className={`badge-estado ${obtenerClaseEstado(p.activo)}`}
                            >
                                {p.activo
                                    ? "ACTIVO"
                                    : "INACTIVO"
                                }
                            </span>

                        </div>


                        {/* Acción */}

                        <div>

                            <button
                                className="btn-editar"
                                onClick={() => onEditar(p)}
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

export default ProfesorList;