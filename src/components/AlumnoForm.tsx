import {useState} from 'react';

/**
 * Props del formulario de alumnos.
 * Recibe una función para enviar los datos del alumno al componente padre encargado de persistirlos.
 */
type Props = {
    onGuardar: (alumno:any)=>void;
};

/**
 * Formulario de alta de alumnos.
 * Permite registrar la información personal y académica de un nuevo alumno dentro del sistema Casa Movimiento.
 */
function AlumnoForm(
    {
    onGuardar
    }:Props
){
    // Estados utilizados para almacenar los datos del formulario
    const[nombre, setNombre ]=useState('');
    const[apellido,setApellido]=useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [grupo, setGrupo] = useState('');
    const [nivel, setNivel] = useState('');
    const [estado, setEstado] = useState('ACTIVO');


    /**
     * Construye el objeto alumno con los datos ingresados y lo envía al componente padre para su registro.
     */
    const guardar=()=>{
        onGuardar({
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
    // Renderizado del formulario de alta de alumnos
    return(
        <div className="card-casa">
            
                <div className="card-casa-header">
                    <h2 className="m-0">
                        Nuevo Alumno
                    </h2>
                </div>

                {/* Campos de carga de información del alumno */}
                <div className="card-casa-body">
                    <div className="mb-3">
                        <label className="label-casa">
                            Nombre
                        </label>

                        <input
                            className="form-control campo-casa"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={
                                e =>
                                setNombre(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="mb-4">
                        <label className="label-casa">
                            Apellido
                        </label>

                        <input
                            className="form-control campo-casa"
                            placeholder="Apellido"
                            value={apellido}
                            onChange={
                                e =>
                                setApellido(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label className="label-casa">
                            Fecha de Nacimiento
                        </label>

                        <input
                            type="date"
                            className="form-control campo-casa"
                            value={fechaNacimiento}
                            onChange={e => setFechaNacimiento(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="label-casa">
                            DNI
                        </label>

                        <input
                            className="form-control campo-casa"
                            value={dni}
                            onChange={e => setDni(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="label-casa">
                            Teléfono / WhatsApp
                        </label>

                        <input
                            className="form-control campo-casa"
                            value={telefono}
                            onChange={e => setTelefono(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="label-casa">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control campo-casa"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="label-casa">
                            Fecha de Ingreso
                        </label>

                        <input
                            type="date"
                            className="form-control campo-casa"
                            value={fechaIngreso}
                            onChange={e => setFechaIngreso(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="label-casa">
                            Disciplina
                        </label>

                        <input
                            className="form-control campo-casa"
                            value={disciplina}
                            onChange={e => setDisciplina(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="label-casa">
                            Grupo
                        </label>

                        <input
                            className="form-control campo-casa"
                            value={grupo}
                            onChange={e => setGrupo(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="label-casa">
                            Nivel
                        </label>

                        <input
                            className="form-control campo-casa"
                            value={nivel}
                            onChange={e => setNivel(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="label-casa">
                            Estado
                        </label>

                        <select
                            className="form-control campo-casa"
                            value={estado}
                            onChange={e => setEstado(e.target.value)}
                        >
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                            <option value="DEUDOR">DEUDOR</option>
                        </select>
                    </div>

                    {/* Acción principal para registrar un nuevo alumno */}
                    <button className="btn-casa w-100" onClick={guardar}>
                        Guardar Alumno
                    </button>
                </div>
            </div>
    );
}

export default AlumnoForm;