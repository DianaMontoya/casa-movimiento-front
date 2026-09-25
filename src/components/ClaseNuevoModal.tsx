import { useEffect, useState } from "react";
import { obtenerProfesores } from "../services/profesorService";

type Props = {
    onCerrar: () => void;
    onGuardar: (clase: any) => Promise<void>;
};


/**
 * Modal para registrar una nueva clase.
 *
 * Mantiene la misma estructura visual que ClaseModal:
 * dos columnas, secciones y observaciones a ancho completo.
 */
function ClaseNuevoModal({
    onCerrar,
    onGuardar
}: Props) {

    // =========================
    // ESTADOS
    // =========================

    const [nombre, setNombre] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [grupo, setGrupo] = useState("");
    const [nivel, setNivel] = useState("");

    const [profesorId, setProfesorId] = useState("");

    const [diaSemana, setDiaSemana] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [salon, setSalon] = useState("");

    const [cupoMaximo, setCupoMaximo] =
        useState<number | string>("");

    const [observaciones, setObservaciones] =
        useState("");

    const [activa, setActiva] =
        useState(true);

    const [profesores, setProfesores] =
        useState<any[]>([]);


    // =========================
    // CARGAR PROFESORES
    // =========================

    useEffect(() => {

        const cargarProfesores = async () => {

            try {

                const data = await obtenerProfesores();

                setProfesores(data);

            } catch (error) {

                console.error(
                    "Error al cargar profesores:",
                    error
                );

            }

        };

        cargarProfesores();

    }, []);


    // =========================
    // GUARDAR
    // =========================

    const guardar = async () => {

        await onGuardar({

            nombre,
            disciplina,
            grupo,
            nivel,

            profesor: profesorId
                ? {
                    id: Number(profesorId)
                }
                : null,

            diaSemana,
            horaInicio,
            horaFin,
            salon,

            cupoMaximo: Number(cupoMaximo),

            observaciones,

            activa

        });

        onCerrar();

    };


    // =========================
    // RENDER
    // =========================

    return (

        <div className="modal-overlay">

            <div className="modal-casa modal-alumno">

                {/* =========================
                    ENCABEZADO
                ========================= */}

                <div className="modal-alumno-header">

                    <div>

                        <h2>
                            Nueva Clase
                        </h2>

                        <small>
                            Registrar una nueva clase
                        </small>

                    </div>

                </div>


                <hr />


                {/* =========================
                    CUERPO
                ========================= */}

                <div className="modal-alumno-body">

                    {/* =========================
                        DATOS DE LA CLASE
                    ========================= */}

                    <div className="alumno-form-seccion">
                        Datos de la clase
                    </div>


                    <div className="alumno-form-grid">

                        {/* Nombre */}

                        <div className="modal-field alumno-form-full">

                            <input
                                className="form-control campo-casa"
                                value={nombre}
                                placeholder="Nombre de la clase"
                                title="Nombre de la clase"
                                aria-label="Nombre de la clase"
                                onChange={e =>
                                    setNombre(e.target.value)
                                }
                            />

                        </div>


                        {/* Disciplina */}

                        <div className="modal-field">

                            <input
                                className="form-control campo-casa"
                                value={disciplina}
                                placeholder="Disciplina"
                                title="Disciplina"
                                aria-label="Disciplina"
                                onChange={e =>
                                    setDisciplina(e.target.value)
                                }
                            />

                        </div>


                        {/* Grupo */}

                        <div className="modal-field">

                            <input
                                className="form-control campo-casa"
                                value={grupo}
                                placeholder="Grupo"
                                title="Grupo"
                                aria-label="Grupo"
                                onChange={e =>
                                    setGrupo(e.target.value)
                                }
                            />

                        </div>


                        {/* Nivel */}

                        <div className="modal-field">

                            <input
                                className="form-control campo-casa"
                                value={nivel}
                                placeholder="Nivel"
                                title="Nivel"
                                aria-label="Nivel"
                                onChange={e =>
                                    setNivel(e.target.value)
                                }
                            />

                        </div>


                        {/* Profesor */}

                        <div className="modal-field">

                            <select
                                className="form-control campo-casa"
                                value={profesorId}
                                title="Profesor"
                                aria-label="Profesor"
                                onChange={e =>
                                    setProfesorId(e.target.value)
                                }
                            >

                                <option value="">
                                    Seleccionar profesor
                                </option>

                                {profesores.map((p: any) => (

                                    <option
                                        key={p.id}
                                        value={p.id}
                                    >
                                        {p.apellido} {p.nombre}
                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>


                    <hr />


                    {/* =========================
                        HORARIOS Y UBICACIÓN
                    ========================= */}

                    <div className="alumno-form-seccion">
                        Horarios y ubicación
                    </div>


                    <div className="alumno-form-grid">

                        {/* Día */}

                        <div className="modal-field">

                            <input
                                className="form-control campo-casa"
                                value={diaSemana}
                                placeholder="Día de la semana"
                                title="Día de la semana"
                                aria-label="Día de la semana"
                                onChange={e =>
                                    setDiaSemana(e.target.value)
                                }
                            />

                        </div>


                        {/* Salón */}

                        <div className="modal-field">

                            <input
                                className="form-control campo-casa"
                                value={salon}
                                placeholder="Salón"
                                title="Salón"
                                aria-label="Salón"
                                onChange={e =>
                                    setSalon(e.target.value)
                                }
                            />

                        </div>


                        {/* Hora inicio */}

                        <div className="modal-field">

                            <label className="modal-mini-label">
                                Hora de inicio
                            </label>

                            <input
                                type="time"
                                className="form-control campo-casa"
                                value={horaInicio}
                                onChange={e =>
                                    setHoraInicio(e.target.value)
                                }
                            />

                        </div>


                        {/* Hora fin */}

                        <div className="modal-field">

                            <label className="modal-mini-label">
                                Hora de finalización
                            </label>

                            <input
                                type="time"
                                className="form-control campo-casa"
                                value={horaFin}
                                onChange={e =>
                                    setHoraFin(e.target.value)
                                }
                            />

                        </div>

                    </div>


                    <hr />


                    {/* =========================
                        CONFIGURACIÓN
                    ========================= */}

                    <div className="alumno-form-seccion">
                        Configuración
                    </div>


                    <div className="alumno-form-grid">

                        {/* Cupo */}

                        <div className="modal-field">

                            <input
                                type="number"
                                className="form-control campo-casa"
                                value={cupoMaximo}
                                placeholder="Cupo máximo"
                                title="Cupo máximo"
                                aria-label="Cupo máximo"
                                min="0"
                                onChange={e =>
                                    setCupoMaximo(e.target.value)
                                }
                            />

                        </div>


                        {/* Estado */}

                        <div className="modal-field">

                            <select
                                className="form-control campo-casa"
                                value={
                                    activa
                                        ? "ACTIVA"
                                        : "INACTIVA"
                                }
                                title="Estado de la clase"
                                aria-label="Estado de la clase"
                                onChange={e =>
                                    setActiva(
                                        e.target.value === "ACTIVA"
                                    )
                                }
                            >

                                <option value="ACTIVA">
                                    ACTIVA
                                </option>

                                <option value="INACTIVA">
                                    INACTIVA
                                </option>

                            </select>

                        </div>


                        {/* Observaciones */}

                        <div className="modal-field alumno-form-full">

                            <label className="modal-mini-label">
                                Observaciones
                            </label>

                            <textarea
                                className="form-control campo-casa"
                                value={observaciones}
                                placeholder="Observaciones"
                                title="Observaciones"
                                aria-label="Observaciones"
                                rows={3}
                                onChange={e =>
                                    setObservaciones(e.target.value)
                                }
                            />

                        </div>

                    </div>

                </div>


                {/* =========================
                    ACCIONES
                ========================= */}

                <div className="mt-3 d-flex gap-2">

                    <button
                        className="btn-casa"
                        onClick={guardar}
                        type="button"
                    >
                        Guardar Clase
                    </button>

                    <button
                        className="btn-editar"
                        onClick={onCerrar}
                        type="button"
                    >
                        Cancelar
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ClaseNuevoModal;


