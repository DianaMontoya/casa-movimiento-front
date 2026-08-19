import { useEffect, useState } from "react";

import { obtenerAlumnos } from "../services/alumnoService";

import {
    obtenerInscripciones,
    inscribirAlumno
} from "../services/inscripcionService";


type Props = {

    clase: any;

    onCerrar: () => void;

    onInscripcion: () => void;

};


/**
 * Modal para inscribir alumnos dentro de una clase.
 */
function ClaseAlumnos({
    clase,
    onCerrar,
    onInscripcion
}: Props) {

    const [alumnos, setAlumnos] = useState<any[]>([]);

    const [inscripciones, setInscripciones] =
        useState<any[]>([]);

    const [alumnoId, setAlumnoId] =
        useState("");


    /**
     * Carga alumnos e inscripciones
     */
    useEffect(() => {

        cargarDatos();

    }, []);


    const cargarDatos = async () => {

        try {

            const alumnosData =
                await obtenerAlumnos();

            const inscripcionesData =
                await obtenerInscripciones();


            setAlumnos(alumnosData);


            const filtradas =
                inscripcionesData.filter(
                    (i: any) =>
                        i.clase?.id === clase.id
                );


            setInscripciones(filtradas);

        } catch (error) {

            console.error(
                "Error al cargar datos:",
                error
            );

        }

    };


    /**
     * Inscribe al alumno seleccionado
     */
    const inscribir = async () => {

        if (!alumnoId) {

            return;

        }


        try {

            await inscribirAlumno({

                alumno: {
                    id: Number(alumnoId)
                },

                clase: {
                    id: clase.id
                },

                estado: "ACTIVO"

            });


            /*
             * Actualizamos el listado local
             */
            await cargarDatos();


            /*
             * Avisamos al Dashboard
             * para actualizar la lista de la clase.
             */
            await onInscripcion();


            /*
             * Cerramos el modal
             */
            onCerrar();


        } catch (error) {

            console.error(
                "Error al inscribir alumno:",
                error
            );

            alert(
                "No se pudo inscribir al alumno."
            );

        }

    };


    return (

        <div className="modal-overlay">

            <div
                className="modal-casa"
                style={{
                    maxWidth: "500px"
                }}
            >

                {/* =========================
                    ENCABEZADO
                ========================= */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <div>

                        <h2
                            style={{
                                margin: 0,
                                fontSize: "1.2rem"
                            }}
                        >
                            🩰 Inscribir alumno
                        </h2>

                        <small
                            style={{
                                color:
                                    "var(--color-texto-sec)"
                            }}
                        >
                            {clase.nombre}
                        </small>

                    </div>


                    <button
                        className="btn-editar"
                        onClick={onCerrar}
                    >
                        ✕
                    </button>

                </div>


                <hr />


                {/* =========================
                    SELECCIÓN DE ALUMNO
                ========================= */}

                <label>
                    Seleccionar alumno
                </label>

                <select
                    className="form-control campo-casa mt-2"
                    value={alumnoId}
                    onChange={e =>
                        setAlumnoId(e.target.value)
                    }
                >

                    <option value="">
                        Seleccionar alumno...
                    </option>


                    {alumnos
                        .filter((a: any) =>
                            !inscripciones.some(
                                (i: any) =>
                                    i.alumno?.id === a.id
                            )
                        )
                        .map((a: any) => (

                            <option
                                key={a.id}
                                value={a.id}
                            >
                                {a.apellido} {a.nombre}
                            </option>

                        ))

                    }

                </select>


                {/* =========================
                    BOTONES
                ========================= */}

                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: "18px"
                    }}
                >

                    <button
                        className="btn-casa"
                        onClick={inscribir}
                        disabled={!alumnoId}
                    >
                        Inscribir
                    </button>


                    <button
                        className="btn btn-secondary"
                        onClick={onCerrar}
                    >
                        Cancelar
                    </button>

                </div>


                {/* =========================
                    ALUMNOS YA INSCRIPTOS
                ========================= */}

                {inscripciones.length > 0 && (

                    <div
                        style={{
                            marginTop: "22px"
                        }}
                    >

                        <small
                            style={{
                                color:
                                    "var(--color-texto-sec)"
                            }}
                        >
                            Alumnos inscriptos
                        </small>


                        {inscripciones.map(
                            (i: any) => (

                                <div
                                    key={i.id}
                                    className="fila-alumno"
                                    style={{
                                        padding:
                                            "8px 0"
                                    }}
                                >

                                    <span>
                                        👤{" "}
                                        {i.alumno?.apellido}{" "}
                                        {i.alumno?.nombre}
                                    </span>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

}

export default ClaseAlumnos;