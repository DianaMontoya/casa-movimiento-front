import { useState } from "react";

type Props = {
    onCerrar: () => void;
    onGuardar: (profesor: any) => Promise<void>;
};


/**
 * Modal utilizado para registrar un nuevo profesor.
 *
 * Mantiene la misma estructura visual que ProfesorModal:
 * dos columnas, secciones y observaciones a ancho completo.
 */
function ProfesorNuevoModal({
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
    const [especialidad, setEspecialidad] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [activo, setActivo] = useState(true);


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
            especialidad,
            observaciones,
            activo

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
                            Nuevo Profesor
                        </h2>

                        <small>
                            Registrar un nuevo integrante del equipo
                        </small>

                    </div>

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


                        {/* Fecha de nacimiento */}

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


                        {/* Fecha de ingreso */}

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
                        DATOS PROFESIONALES
                    ========================= */}

                    <div className="alumno-form-seccion">
                        Datos profesionales
                    </div>


                    <div className="alumno-form-grid">

                        {/* Especialidad */}

                        <div className="modal-field">

                            <input
                                className="form-control campo-casa"
                                value={especialidad}
                                placeholder="Especialidad"
                                title="Especialidad"
                                aria-label="Especialidad"
                                onChange={e =>
                                    setEspecialidad(e.target.value)
                                }
                            />

                        </div>


                        {/* Estado */}

                        <div className="modal-field">

                            <select
                                className="form-control campo-casa"
                                value={
                                    activo
                                        ? "ACTIVO"
                                        : "INACTIVO"
                                }
                                title="Estado del profesor"
                                aria-label="Estado del profesor"
                                onChange={e =>
                                    setActivo(
                                        e.target.value === "ACTIVO"
                                    )
                                }
                            >

                                <option value="ACTIVO">
                                    ACTIVO
                                </option>

                                <option value="INACTIVO">
                                    INACTIVO
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
                        Guardar Profesor
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

export default ProfesorNuevoModal;

