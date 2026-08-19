import { useEffect, useState } from "react";
import { obtenerProfesores } from "../services/profesorService";

type Props = {
    clase: any;
    onCerrar: () => void;
    onGuardar: (clase: any) => void;
};

/**
 * Modal de edición de clases.
 *
 * Permite modificar únicamente los datos
 * propios de una clase.
 */
function ClaseModal({
    clase,
    onCerrar,
    onGuardar
}: Props) {

    if (!clase) return null;

    // =========================
    // ESTADOS DE LA CLASE
    // =========================

    const [nombre, setNombre] = useState(clase.nombre);
    const [disciplina, setDisciplina] = useState(clase.disciplina);
    const [grupo, setGrupo] = useState(clase.grupo);
    const [nivel, setNivel] = useState(clase.nivel);

    const [profesorId, setProfesorId] = useState(
        clase.profesor?.id || ""
    );

    const [diaSemana, setDiaSemana] = useState(clase.diaSemana);
    const [horaInicio, setHoraInicio] = useState(clase.horaInicio);
    const [horaFin, setHoraFin] = useState(clase.horaFin);
    const [salon, setSalon] = useState(clase.salon);
    const [cupoMaximo, setCupoMaximo] = useState(clase.cupoMaximo);
    const [observaciones, setObservaciones] = useState(
        clase.observaciones
    );
    const [activa, setActiva] = useState(clase.activa);

    const [profesores, setProfesores] = useState<any[]>([]);


    // =========================
    // CARGAR PROFESORES
    // =========================

    useEffect(() => {
        cargarProfesores();
    }, []);

    const cargarProfesores = async () => {

        const data = await obtenerProfesores();

        setProfesores(data);

    };


    // =========================
    // GUARDAR CAMBIOS
    // =========================

    const guardarCambios = () => {

        onGuardar({

            ...clase,

            nombre,
            disciplina,
            grupo,
            nivel,

            profesor: {
                id: Number(profesorId)
            },

            diaSemana,
            horaInicio,
            horaFin,
            salon,

            cupoMaximo: Number(cupoMaximo),

            observaciones,

            activa

        });

    };


    // =========================
    // RENDER
    // =========================

    return (

        <div className="modal-overlay">

            <div className="modal-casa">

                <h2>Editar Clase</h2>

                <hr />


                {/* NOMBRE */}

                <input
                    className="form-control mt-2"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Nombre de la clase"
                />


                {/* DISCIPLINA */}

                <input
                    className="form-control mt-2"
                    value={disciplina}
                    onChange={e => setDisciplina(e.target.value)}
                    placeholder="Disciplina"
                />


                {/* GRUPO */}

                <input
                    className="form-control mt-2"
                    value={grupo}
                    onChange={e => setGrupo(e.target.value)}
                    placeholder="Grupo"
                />


                {/* NIVEL */}

                <input
                    className="form-control mt-2"
                    value={nivel}
                    onChange={e => setNivel(e.target.value)}
                    placeholder="Nivel"
                />


                {/* PROFESOR */}

                <select
                    className="form-control mt-2"
                    value={profesorId}
                    onChange={e => setProfesorId(e.target.value)}
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


                {/* DÍA */}

                <input
                    className="form-control mt-2"
                    value={diaSemana}
                    onChange={e => setDiaSemana(e.target.value)}
                    placeholder="Día de la semana"
                />


                {/* HORA INICIO */}

                <input
                    type="time"
                    className="form-control mt-2"
                    value={horaInicio}
                    onChange={e => setHoraInicio(e.target.value)}
                />


                {/* HORA FIN */}

                <input
                    type="time"
                    className="form-control mt-2"
                    value={horaFin}
                    onChange={e => setHoraFin(e.target.value)}
                />


                {/* SALÓN */}

                <input
                    className="form-control mt-2"
                    value={salon}
                    onChange={e => setSalon(e.target.value)}
                    placeholder="Salón"
                />


                {/* CUPO */}

                <input
                    type="number"
                    className="form-control mt-2"
                    value={cupoMaximo}
                    onChange={e => setCupoMaximo(e.target.value)}
                    placeholder="Cupo máximo"
                />


                {/* OBSERVACIONES */}

                <textarea
                    className="form-control mt-2"
                    value={observaciones || ""}
                    onChange={e => setObservaciones(e.target.value)}
                    placeholder="Observaciones"
                    rows={3}
                />


                {/* ACTIVA */}

                <select
                    className="form-control mt-2"
                    value={activa ? "ACTIVA" : "INACTIVA"}
                    onChange={e =>
                        setActiva(e.target.value === "ACTIVA")
                    }
                >

                    <option value="ACTIVA">
                        ACTIVA
                    </option>

                    <option value="INACTIVA">
                        INACTIVA
                    </option>

                </select>


                {/* BOTONES */}

                <div className="d-flex gap-2 mt-3">

                    <button
                        className="btn-casa"
                        onClick={guardarCambios}
                    >
                        Guardar
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={onCerrar}
                    >
                        Cancelar
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ClaseModal;