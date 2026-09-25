import { useState } from "react";

type Props = {
    onCerrar: () => void;
    onGuardar: (alumno: any) => Promise<void>;
};


/**
 * Obtiene la fecha actual en formato YYYY-MM-DD.
 */
const obtenerFechaActual = () => {

    const hoy = new Date();

    const year = hoy.getFullYear();

    const month = String(
        hoy.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        hoy.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
};


/**
 * Modal para registrar un nuevo alumno.
 *
 * Mantiene la misma estructura visual que AlumnoModal:
 * dos columnas, secciones y campos compactos.
 */
function AlumnoNuevoModal({
    onCerrar,
    onGuardar
}: Props) {

    // =========================
    // ESTADOS
    // =========================

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [fechaIngreso, setFechaIngreso] =
        useState(obtenerFechaActual());

    const [disciplina, setDisciplina] = useState("");
    const [grupo, setGrupo] = useState("");
    const [nivel, setNivel] = useState("");
    const [estado, setEstado] = useState("ACTIVO");


    // =========================
    // GUARDAR
    // =========================

    const guardar = async () => {

        await onGuardar({

            nombre,
            apellido,
            fechaNacimiento,
            dni,
            telefono,
            email,
            fechaIngreso,
            disciplina,
            grupo,
            nivel,
            estado

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
                            Nuevo Alumno
                        </h2>

                        <small>
                            Registrar una nueva persona
                        </small>

                    </div>

                    <button
                        className="modal-cerrar"
                        onClick={onCerrar}
                        type="button"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>

                </div>


                <hr />


                {/* =========================
                    CUERPO
                ========================= */}

                <div className="modal-alumno-body">

                    {/* =========================
                        DATOS PERSONALES
                    ========================= */}

                    <div className="alumno-form-seccion">
                        Datos personales
                    </div>


                    <div className="alumno-form-grid">

                        {/* Nombre */}

                        <div className="modal-field">

                            <input
                                className="form-control campo-casa"
                                value={nombre}
                                placeholder="Nombre"
                                title="Nombre"
                                aria-label="Nombre"
                                onChange={e =>
                                    setNombre(e.target.value)
                                }
                            />

                        </div>


                        {/* Apellido */}

                        <div className="modal-field">

                            <input
                                className="form-control campo-casa"
                                value={apellido}
                                placeholder="Apellido"
                                title="Apellido"
                                aria-label="Apellido"
                                onChange={e =>
                                    setApellido(e.target.value)
                                }
                            />

                        </div>


                        {/* DNI */}

                        <div className="modal-field">

                            <input
                                className="form-control campo-casa"
                                value={dni}
                                placeholder="DNI"
                                title="Documento de identidad"
                                aria-label="DNI"
                                onChange={e =>
                                    setDni(e.target.value)
                                }
                            />

                        </div>


                        {/* Teléfono */}

                        <div className="modal-field">

                            <input
                                className="form-control campo-casa"
                                value={telefono}
                                placeholder="Teléfono / WhatsApp"
                                title="Teléfono / WhatsApp"
                                aria-label="Teléfono / WhatsApp"
                                onChange={e =>
                                    setTelefono(e.target.value)
                                }
                            />

                        </div>


                        {/* Email */}

                        <div className="modal-field alumno-form-full">

                            <label className="modal-mini-label">
                                Correo Electrónico
                            </label>

                            <input
                                type="email"
                                className="form-control campo-casa"
                                value={email}
                                placeholder="Email"
                                title="Correo electrónico"
                                aria-label="Email"
                                onChange={e =>
                                    setEmail(e.target.value)
                                }
                            />

                        </div>


                        {/* Fecha nacimiento */}

                        <div className="modal-field">

                            <label className="modal-mini-label">
                                Fecha de nacimiento
                            </label>

                            <input
                                type="date"
                                className="form-control campo-casa"
                                value={fechaNacimiento}
                                onChange={e =>
                                    setFechaNacimiento(e.target.value)
                                }
                            />

                        </div>


                        {/* Fecha ingreso */}

                        <div className="modal-field">

                            <label className="modal-mini-label">
                                Fecha de ingreso
                            </label>

                            <input
                                type="date"
                                className="form-control campo-casa"
                                value={fechaIngreso}
                                onChange={e =>
                                    setFechaIngreso(e.target.value)
                                }
                            />

                        </div>

                    </div>


                    <hr />


                    {/* =========================
                        DATOS ACADÉMICOS
                    ========================= */}

                    <div className="alumno-form-seccion">
                        Datos académicos
                    </div>


                    <div className="alumno-form-grid">

                        {/* Disciplina */}

                        <div className="modal-field">

                            <select
                                className="form-control campo-casa"
                                value={disciplina}
                                title="Disciplina"
                                aria-label="Disciplina"
                                onChange={e =>
                                    setDisciplina(e.target.value)
                                }
                            >

                                <option value="">
                                    Seleccionar disciplina
                                </option>

                                <option value="introduccionaladanza">
                                    INTRODUCCIÓN A LA DANZA
                                </option>

                                <option value="jazz">
                                    JAZZ
                                </option>

                                <option value="libre">
                                    LIBRE
                                </option>

                            </select>

                        </div>


                        {/* Grupo */}

                        <div className="modal-field">

                            <select
                                className="form-control campo-casa"
                                value={grupo}
                                title="Grupo"
                                aria-label="Grupo"
                                onChange={e =>
                                    setGrupo(e.target.value)
                                }
                            >

                                <option value="">
                                    Seleccionar grupo
                                </option>

                                <option value="jardin">
                                    JARDÍN
                                </option>

                                <option value="infantil">
                                    INFANTIL
                                </option>

                                <option value="juvenil">
                                    JUVENIL
                                </option>

                            </select>

                        </div>


                        {/* Nivel */}

                        <div className="modal-field">

                            <select
                                className="form-control campo-casa"
                                value={nivel}
                                title="Nivel"
                                aria-label="Nivel"
                                onChange={e =>
                                    setNivel(e.target.value)
                                }
                            >

                                <option value="">
                                    Seleccionar nivel
                                </option>

                                <option value="principiante">
                                    PRINCIPIANTE
                                </option>

                                <option value="intermedio">
                                    INTERMEDIO
                                </option>

                                <option value="avanzado">
                                    AVANZADO
                                </option>

                            </select>

                        </div>


                        {/* Estado */}

                        <div className="modal-field">

                            <select
                                className="form-control campo-casa"
                                value={estado}
                                title="Estado del alumno"
                                aria-label="Estado del alumno"
                                onChange={e =>
                                    setEstado(e.target.value)
                                }
                            >

                                <option value="ACTIVO">
                                    ACTIVO
                                </option>

                                <option value="INACTIVO">
                                    INACTIVO
                                </option>

                                <option value="DEUDOR">
                                    DEUDOR
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* =========================
                    ACCIONES
                ========================= */}

                <div className="modal-alumno-actions">

                    <button
                        className="btn-casa"
                        onClick={guardar}
                        type="button"
                    >
                        Guardar Alumno
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

export default AlumnoNuevoModal;

