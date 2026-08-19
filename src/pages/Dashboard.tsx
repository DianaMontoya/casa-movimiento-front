import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerClases } from "../services/claseService";
import { obtenerInscripciones } from "../services/inscripcionService";
import ClaseAlumnos from "../components/ClaseAlumnos";

/**
 * Dashboard principal de Casa Movimiento.
 *
 * Centraliza el acceso a los distintos módulos del sistema
 * y muestra las clases activas con sus alumnos inscriptos.
 */
function Dashboard() {

    const [clases, setClases] = useState<any[]>([]);
    const [inscripciones, setInscripciones] = useState<any[]>([]);
    const [claseSeleccionada, setClaseSeleccionada] = useState<any>(null);

    /**
     * Carga inicial
     */
    useEffect(() => {
        cargarDatos();
    }, []);

    /**
     * Carga clases e inscripciones
     */
    const cargarDatos = async () => {

        try {

            const clasesData = await obtenerClases();
            const inscripcionesData = await obtenerInscripciones();

            setClases(clasesData);
            setInscripciones(inscripcionesData);

        } catch (error) {

            console.error("Error al cargar datos del dashboard:", error);

        }

    };

    /**
     * Devuelve las inscripciones correspondientes
     * a una determinada clase.
     */
    const obtenerAlumnosDeClase = (claseId: number) => {

        return inscripciones.filter(
            (i: any) => i.clase?.id === claseId
        );

    };

    /**
     * Abre el modal de inscripción
     */
    const abrirInscripcion = (clase: any) => {

        setClaseSeleccionada(clase);

    };

    /**
     * Cierra el modal
     */
    const cerrarInscripcion = () => {

        setClaseSeleccionada(null);

    };

    /**
     * Se ejecuta después de una inscripción exitosa.
     *
     * Volvemos a cargar las inscripciones para que
     * el Dashboard muestre inmediatamente al nuevo alumno.
     */
    const actualizarInscripciones = async () => {

        try {

            const data = await obtenerInscripciones();

            setInscripciones(data);

        } catch (error) {

            console.error(
                "Error al actualizar inscripciones:",
                error
            );

        }

    };

    return (

        <div className="dashboard">

            <h1 className="titulo-principal">
                CASA MOVIMIENTO
            </h1>


            <div className="dashboard-content">

                {/* =========================
                    ACCESOS PRINCIPALES
                ========================= */}

                <div className="dashboard-grid">

                    <Link
                        to="/movimientos"
                        className="card-dashboard"
                    >
                        💰
                        <h3>Movimientos</h3>
                    </Link>

                    <Link
                        to="/pagos"
                        className="card-dashboard"
                    >
                        💸
                        <h3>Pagos</h3>
                    </Link>

                    <Link
                        to="/balance"
                        className="card-dashboard"
                    >
                        📊
                        <h3>Balance</h3>
                    </Link>

                    <Link
                        to="/alumnos"
                        className="card-dashboard"
                    >
                        👥
                        <h3>Alumnos</h3>
                    </Link>

                    <Link
                        to="/profesores"
                        className="card-dashboard"
                    >
                        👩‍🏫
                        <h3>Profesores</h3>
                    </Link>

                    <Link
                        to="/clases"
                        className="card-dashboard"
                    >
                        🩰
                        <h3>Clases</h3>
                    </Link>

                </div>


                {/* =========================
                    CLASES ACTIVAS
                ========================= */}

                <div className="card-casa clases-activas mt-4">

                    <div className="card-casa-header">

                        <h2 className="m-0">
                            🩰 Clases activas
                        </h2>

                    </div>


                    <div className="card-casa-body">

                        {clases.length === 0 ? (

                            <p className="text-muted">
                                No hay clases cargadas
                            </p>

                        ) : (

                            clases
                                .filter((c: any) => c.activa)
                                .map((c: any) => {

                                    const alumnosClase =
                                        obtenerAlumnosDeClase(c.id);

                                    return (

                                        <div
                                            key={c.id}
                                            className="fila-alumno"
                                        >

                                            {/* Información de la clase */}

                                            <div className="info-pago">

                                                <div className="nombre-alumno">

                                                    🩰 {c.nombre}

                                                </div>

                                                <small>

                                                    {c.disciplina}
                                                    {" · "}
                                                    {c.diaSemana}
                                                    {" · "}
                                                    {c.horaInicio}

                                                </small>


                                                {/* Alumnos inscriptos */}

                                                <div
                                                    style={{
                                                        marginTop: "6px"
                                                    }}
                                                >

                                                    {alumnosClase.length === 0 ? (

                                                        <small className="text-muted">
                                                            Sin alumnos inscriptos
                                                        </small>

                                                    ) : (

                                                        <small>

                                                            👥{" "}

                                                            {alumnosClase
                                                                .map(
                                                                    (i: any) =>
                                                                        `${i.alumno?.apellido} ${i.alumno?.nombre}`
                                                                )
                                                                .join(", ")
                                                            }

                                                        </small>

                                                    )}

                                                </div>

                                            </div>


                                            {/* Cupo + botón */}

                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-end",
                                                    gap: "8px"
                                                }}
                                            >

                                                <small>

                                                    👥{" "}
                                                    {alumnosClase.length}
                                                    {" / "}
                                                    {c.cupoMaximo
                                                        ? c.cupoMaximo
                                                        : "—"
                                                    }

                                                </small>


                                                <button
                                                    className="btn-casa"
                                                    onClick={() =>
                                                        abrirInscripcion(c)
                                                    }
                                                >
                                                    + Inscribir alumno
                                                </button>

                                            </div>

                                        </div>

                                    );

                                })

                        )}

                    </div>

                </div>

            </div>


            {/* =========================
                MODAL DE INSCRIPCIÓN
            ========================= */}

            {claseSeleccionada && (

                <ClaseAlumnos

                    clase={claseSeleccionada}

                    onCerrar={cerrarInscripcion}

                    onInscripcion={actualizarInscripciones}

                />

            )}

        </div>

    );

}

export default Dashboard;