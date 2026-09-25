import { useEffect, useState } from "react";

/**
 * Props del modal de edición de alumnos.
 */
type Props = {
    alumno: any;
    onCerrar: () => void;
    onGuardar: (alumno: any) => void;
};


/**
 * Modal utilizado para editar la información de un alumno existente.
 *
 * Diseño compacto en dos columnas para reducir la altura del modal.
 */
function AlumnoModal({
    alumno,
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
    const [fechaIngreso, setFechaIngreso] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [grupo, setGrupo] = useState("");
    const [nivel, setNivel] = useState("");
    const [estado, setEstado] = useState("");


    // =========================
    // SINCRONIZAR ALUMNO
    // =========================

    useEffect(() => {

        if (!alumno) {
            return;
        }

        setNombre(alumno.nombre || "");
        setApellido(alumno.apellido || "");
        setFechaNacimiento(alumno.fechaNacimiento || "");
        setDni(alumno.dni || "");
        setTelefono(alumno.telefono || "");
        setEmail(alumno.email || "");
        setFechaIngreso(alumno.fechaIngreso || "");
        setDisciplina(alumno.disciplina || "");
        setGrupo(alumno.grupo || "");
        setNivel(alumno.nivel || "");
        setEstado(alumno.estado || "");

    }, [alumno]);


    // =========================
    // GUARDAR
    // =========================

    const guardarCambios = () => {

        onGuardar({

            ...alumno,

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

    };


    // Si no hay alumno seleccionado, no mostramos nada

    if (!alumno) {
        return null;
    }


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
                            Editar Alumno
                        </h2>

                        <small>
                            {apellido} {nombre}
                        </small>

                    </div>

                </div>


                <hr />


                {/* =========================
                    FORMULARIO
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
                                onChange={
                                    e =>
                                        setNombre(
                                            e.target.value
                                        )
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
                                onChange={
                                    e =>
                                        setApellido(
                                            e.target.value
                                        )
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
                                onChange={
                                    e =>
                                        setDni(
                                            e.target.value
                                        )
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
                                onChange={
                                    e =>
                                        setTelefono(
                                            e.target.value
                                        )
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
                                onChange={
                                    e =>
                                        setEmail(
                                            e.target.value
                                        )
                                }
                            />

                        </div>


                        <div className="alumno-form-grid">

                            {/* otras cosas */}

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

                                <input
                                    className="form-control campo-casa"
                                    value={disciplina}
                                    placeholder="Disciplina"
                                    title="Disciplina"
                                    aria-label="Disciplina"
                                    onChange={
                                        e =>
                                            setDisciplina(
                                                e.target.value
                                            )
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
                                    onChange={
                                        e =>
                                            setGrupo(
                                                e.target.value
                                            )
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
                                    onChange={
                                        e =>
                                            setNivel(
                                                e.target.value
                                            )
                                    }
                                />

                            </div>


                            {/* Estado */}

                            <div className="modal-field">

                                <select
                                    className="form-control campo-casa"
                                    value={estado}
                                    title="Estado del alumno"
                                    aria-label="Estado del alumno"
                                    onChange={
                                        e =>
                                            setEstado(
                                                e.target.value
                                            )
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

                <div className="mt-3 d-flex gap-2">

                    <button
                        className="btn-casa"
                        onClick={guardarCambios}
                    >
                        Guardar Cambios
                    </button>

                    <button
                        className="btn-editar"
                        onClick={onCerrar}
                    >
                        Cancelar
                    </button>

                </div>

            </div>

        </div>

    );

}

export default AlumnoModal;

