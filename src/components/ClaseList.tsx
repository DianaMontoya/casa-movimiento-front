type Props = {
    clases: any[];
    onEditar: (clase: any) => void;
};

/**
 * Listado de clases registradas en el sistema.
 *
 * Muestra información clave de cada clase:
 * - Nombre
 * - Profesor
 * - Horario
 * - Día
 * - Salón
 */
function ClaseList({

    clases,

    onEditar

}: Props) {

    return (

        <div className="lista-casa">

            {/* =========================
                HEADER
            ========================= */}

            <div className="lista-casa-header">

                <h2 className="m-0">
                    Clases Registradas
                </h2>

            </div>


            {/* =========================
                ENCABEZADOS
            ========================= */}

            <div className="fila-clase fila-clase-header">

                <div>
                    CLASE
                </div>

                <div>
                    PROFESOR
                </div>

                <div>
                    HORARIO
                </div>

                <div>
                    SALÓN
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

            {clases.map((c: any) => (

                <div

                    key={c.id}

                    className="fila-clase"

                >

                    {/* Clase */}

                    <div>

                        <div className="nombre-alumno">

                            🩰 {c.nombre}

                        </div>

                        <small>

                            {c.disciplina}

                            {c.grupo
                                ? ` · ${c.grupo}`
                                : ""
                            }

                            {c.nivel
                                ? ` · ${c.nivel}`
                                : ""
                            }

                        </small>

                    </div>


                    {/* Profesor */}

                    <div>

                        <small>

                            👩‍🏫{" "}

                            {c.profesor?.apellido}{" "}

                            {c.profesor?.nombre}

                        </small>

                    </div>


                    {/* Horario */}

                    <div>

                        <small>

                            🗓️ {c.diaSemana}

                        </small>

                        <br />

                        <small>

                            🕒 {c.horaInicio} - {c.horaFin}

                        </small>

                    </div>


                    {/* Salón */}

                    <div>

                        <small>

                            📍 {c.salon}

                        </small>

                    </div>


                    {/* Estado */}

                    <div>

                        <span

                            className={
                                `badge-estado ${
                                    c.activa
                                        ? "estado-activo"
                                        : "estado-inactivo"
                                }`
                            }

                        >

                            {c.activa
                                ? "ACTIVA"
                                : "INACTIVA"
                            }

                        </span>

                    </div>


                    {/* Acción */}

                    <div>

                        <button

                            className="btn-editar"

                            onClick={() => onEditar(c)}

                        >

                            Editar

                        </button>

                    </div>

                </div>

            ))}

        </div>

    );

}

export default ClaseList;