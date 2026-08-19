import { useEffect, useState } from "react";
import { obtenerProfesores } from "../services/profesorService";

type Props = {
    onGuardar: (clase: any) => void;
};

/**
 * Formulario de alta de clases.
 *
 * Permite registrar una nueva clase y asignarle
 * un profesor previamente registrado.
 */
function ClaseForm({

    onGuardar

}: Props) {

    // Información general
    const [nombre, setNombre] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [grupo, setGrupo] = useState("");
    const [nivel, setNivel] = useState("");

    // Profesor seleccionado
    const [profesorId, setProfesorId] = useState("");

    // Horarios
    const [diaSemana, setDiaSemana] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");

    // Datos adicionales
    const [salon, setSalon] = useState("");
    const [cupoMaximo, setCupoMaximo] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [activa, setActiva] = useState(true);

    // Listado de profesores
    const [profesores, setProfesores] = useState<any[]>([]);

    /**
     * Carga los profesores disponibles.
     */
    useEffect(() => {

        cargarProfesores();

    }, []);

    const cargarProfesores = async () => {

        const data = await obtenerProfesores();

        setProfesores(data);

    };

    /**
     * Envía la nueva clase al componente padre.
     */
    const guardar = async () => {

        await onGuardar({
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

        setNombre("");
        setDisciplina("");
        setGrupo("");
        setNivel("");
        setProfesorId("");
        setDiaSemana("");
        setHoraInicio("");
        setHoraFin("");
        setSalon("");
        setCupoMaximo("");
        setObservaciones("");
        setActiva(true);
    };

    return (

        <>

            {/* Información General */}

            <div className="card-casa">

                <div className="card-casa-header">

                    <h2 className="m-0">

                        Nueva Clase

                    </h2>

                </div>

                <div className="card-casa-body">

                    <div className="mb-3">

                        <label className="label-casa">

                            Nombre

                        </label>

                        <input

                            className="form-control campo-casa"

                            value={nombre}

                            onChange={
                                e =>
                                    setNombre(e.target.value)
                            }

                        />

                    </div>

                    <div className="mb-3">

                        <label className="label-casa">

                            Disciplina

                        </label>

                        <input

                            className="form-control campo-casa"

                            value={disciplina}

                            onChange={
                                e =>
                                    setDisciplina(e.target.value)
                            }

                        />

                    </div>

                    <div className="mb-3">

                        <label className="label-casa">

                            Grupo

                        </label>

                        <input

                            className="form-control campo-casa"

                            value={grupo}

                            onChange={
                                e =>
                                    setGrupo(e.target.value)
                            }

                        />

                    </div>

                    <div className="mb-3">

                        <label className="label-casa">

                            Nivel

                        </label>

                        <input

                            className="form-control campo-casa"

                            value={nivel}

                            onChange={
                                e =>
                                    setNivel(e.target.value)
                            }

                        />

                    </div>

                    <div className="mb-3">

                        <label className="label-casa">

                            Profesor

                        </label>

                        <select

                            className="form-control campo-casa"

                            value={profesorId}

                            onChange={
                                e =>
                                    setProfesorId(e.target.value)
                            }

                        >

                            <option value="">

                                Seleccione...

                            </option>

                            {

                                profesores.map(

                                    (p: any) =>

                                        <option

                                            key={p.id}

                                            value={p.id}

                                        >

                                            {p.apellido} {p.nombre}

                                        </option>

                                )

                            }

                        </select>

                    </div>

                </div>

            </div>

            {/* Horario */}

            <div className="card-casa mt-4">

                <div className="card-casa-header">

                    <h2 className="m-0">

                        Horario

                    </h2>

                </div>

                <div className="card-casa-body">

                    <div className="mb-3">

                        <label className="label-casa">

                            Día

                        </label>

                        <input

                            className="form-control campo-casa"

                            value={diaSemana}

                            onChange={
                                e =>
                                    setDiaSemana(e.target.value)
                            }

                        />

                    </div>

                    <div className="mb-3">

                        <label className="label-casa">

                            Hora Inicio

                        </label>

                        <input

                            type="time"

                            className="form-control campo-casa"

                            value={horaInicio}

                            onChange={
                                e =>
                                    setHoraInicio(e.target.value)
                            }

                        />

                    </div>

                    <div className="mb-3">

                        <label className="label-casa">

                            Hora Fin

                        </label>

                        <input

                            type="time"

                            className="form-control campo-casa"

                            value={horaFin}

                            onChange={
                                e =>
                                    setHoraFin(e.target.value)
                            }

                        />

                    </div>

                    <div className="mb-3">

                        <label className="label-casa">

                            Salón

                        </label>

                        <input

                            className="form-control campo-casa"

                            value={salon}

                            onChange={
                                e =>
                                    setSalon(e.target.value)
                            }

                        />

                    </div>

                    <div className="mb-3">

                        <label className="label-casa">

                            Cupo Máximo

                        </label>

                        <input

                            type="number"

                            className="form-control campo-casa"

                            value={cupoMaximo}

                            onChange={
                                e =>
                                    setCupoMaximo(e.target.value)
                            }

                        />

                    </div>

                    <div className="mb-3">

                        <label className="label-casa">

                            Observaciones

                        </label>

                        <textarea

                            className="form-control campo-casa"

                            value={observaciones}

                            onChange={
                                e =>
                                    setObservaciones(e.target.value)
                            }

                        />

                    </div>

                    <div className="mb-4">

                        <label className="label-casa">

                            Estado

                        </label>

                        <select

                            className="form-control campo-casa"

                            value={activa ? "ACTIVA" : "INACTIVA"}

                            onChange={
                                e =>
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

                    <button

                        className="btn-casa w-100"

                        onClick={guardar}

                    >

                        Guardar Clase

                    </button>

                </div>

            </div>

        </>

    );

}

export default ClaseForm;