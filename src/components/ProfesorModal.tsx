import { useState } from "react";

type Props = {
    profesor: any;
    onCerrar: () => void;
    onGuardar: (profesor: any) => void;
};

/**
 * Modal de edición de profesores.
 *
 * Permite modificar la información completa
 * de un profesor ya registrado.
 */
function ProfesorModal({

    profesor,

    onCerrar,

    onGuardar

}: Props) {

    // Si no existe un profesor seleccionado, no se renderiza el modal.
    if (!profesor)
        return null;

    // Estados locales del formulario de edición.
    const [nombre, setNombre] = useState(profesor.nombre);

    const [apellido, setApellido] = useState(profesor.apellido);

    const [fechaNacimiento, setFechaNacimiento] = useState(
        profesor.fechaNacimiento
    );

    const [dni, setDni] = useState(
        profesor.dni
    );

    const [telefono, setTelefono] = useState(
        profesor.telefono
    );

    const [email, setEmail] = useState(
        profesor.email
    );

    const [fechaIngreso, setFechaIngreso] = useState(
        profesor.fechaIngreso
    );

    const [especialidad, setEspecialidad] = useState(
        profesor.especialidad
    );

    const [observaciones, setObservaciones] = useState(
        profesor.observaciones
    );

    const [activo, setActivo] = useState(
        profesor.activo
    );

    /**
     * Envía al componente padre el profesor actualizado.
     */
    const guardarCambios = () => {

        onGuardar({

            ...profesor,

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

    };

    return (

        <div className="modal-overlay">

            <div className="modal-casa">

                <h2>

                    Editar Profesor

                </h2>

                <hr />

                {/* Nombre */}

                <div className="mb-3">

                    <label>Nombre</label>

                    <input

                        className="form-control"

                        value={nombre}

                        onChange={

                            e =>

                                setNombre(
                                    e.target.value
                                )

                        }

                    />

                </div>

                {/* Apellido */}

                <div className="mb-3">

                    <label>Apellido</label>

                    <input

                        className="form-control"

                        value={apellido}

                        onChange={

                            e =>

                                setApellido(
                                    e.target.value
                                )

                        }

                    />

                </div>

                {/* Fecha de nacimiento */}

                <div className="mb-3">

                    <label>Fecha de Nacimiento</label>

                    <input

                        type="date"

                        className="form-control"

                        value={fechaNacimiento}

                        onChange={

                            e =>

                                setFechaNacimiento(
                                    e.target.value
                                )

                        }

                    />

                </div>

                {/* DNI */}

                <div className="mb-3">

                    <label>DNI</label>

                    <input

                        className="form-control"

                        value={dni}

                        onChange={

                            e =>

                                setDni(
                                    e.target.value
                                )

                        }

                    />

                </div>

                {/* Teléfono */}

                <div className="mb-3">

                    <label>Teléfono</label>

                    <input

                        className="form-control"

                        value={telefono}

                        onChange={

                            e =>

                                setTelefono(
                                    e.target.value
                                )

                        }

                    />

                </div>

                {/* Email */}

                <div className="mb-3">

                    <label>Email</label>

                    <input

                        type="email"

                        className="form-control"

                        value={email}

                        onChange={

                            e =>

                                setEmail(
                                    e.target.value
                                )

                        }

                    />

                </div>

                {/* Fecha de ingreso */}

                <div className="mb-3">

                    <label>Fecha de Ingreso</label>

                    <input

                        type="date"

                        className="form-control"

                        value={fechaIngreso}

                        onChange={

                            e =>

                                setFechaIngreso(
                                    e.target.value
                                )

                        }

                    />

                </div>

                {/* Especialidad */}

                <div className="mb-3">

                    <label>Especialidad</label>

                    <input

                        className="form-control"

                        value={especialidad}

                        onChange={

                            e =>

                                setEspecialidad(
                                    e.target.value
                                )

                        }

                    />

                </div>

                {/* Observaciones */}

                <div className="mb-3">

                    <label>Observaciones</label>

                    <textarea

                        className="form-control"

                        value={observaciones}

                        onChange={

                            e =>

                                setObservaciones(
                                    e.target.value
                                )

                        }

                    />

                </div>

                {/* Estado */}

                <div className="mb-4">

                    <label>

                        Estado

                    </label>

                    <select

                        className="form-control"

                        value={

                            activo

                                ? "ACTIVO"

                                : "INACTIVO"

                        }

                        onChange={

                            e =>

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

                {/* Botones de acción */}

                <div className="d-flex gap-2">

                    <button

                        className="btn-casa"

                        onClick={guardarCambios}

                    >

                        Guardar Cambios

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

export default ProfesorModal;