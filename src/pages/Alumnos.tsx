import {useEffect,useState} from 'react';
import AlumnoList from '../components/AlumnoList';
import AlumnoForm from '../components/AlumnoForm';
import AlumnoModal from '../components/AlumnoModal';

import {
    obtenerAlumnos,
    guardarAlumno,
    actualizarAlumno
}
from '../services/alumnoService';

/** * Pantalla principal de gestión de alumnos. 
 * * * Permite: 
    * * - Registrar nuevos alumnos. 
    * * - Consultar el listado completo. 
    * * - Buscar alumnos por nombre o apellido. 
    * * - Editar información existente. */
function Alumnos(){
    // Listado completo de alumnos obtenidos desde la API
    const[alumnos, setAlumnos]=useState([]);

    // Alumno actualmente seleccionado para edición
    const [alumnoEditando, setAlumnoEditando] =useState<any | null>(null);

    // Texto ingresado en el buscador
    const [busqueda, setBusqueda] = useState('');

    /** * Carga inicial de alumnos al ingresar a la pantalla. */
    useEffect(()=>{
        cargar();
    },[]);


    /** * Registra un nuevo alumno y actualiza el listado. */
    const guardar=
        async(alumno:any)=>{
        await guardarAlumno(
            alumno
        );
        await cargar();
    };

    /** * Actualiza la información de un alumno existente, cierra el modal de edición y recarga los datos. */
    const actualizar =
        async(alumno:any)=>{
        await actualizarAlumno(
            alumno
        );

        setAlumnoEditando(
            null
        );

        await cargar();
    };

    /** * Obtiene todos los alumnos registrados desde el backend. */
    const cargar= async()=>{
        const data= await obtenerAlumnos();
        setAlumnos(data);
    };

    /** * Filtra los alumnos según el texto ingresado en el buscador. * * La búsqueda se realiza por nombre o apellido. */
    const alumnosFiltrados = alumnos.filter(
        (a: any) =>
            a.nombre
                .toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                )
            ||
            a.apellido
                .toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                )
    );

    // Renderizado de la pantalla de alumnos
    return(
        <div className="container mt-4">

                <h1 className="titulo-principal">
                    CASA MOVIMIENTO
                </h1>
            
                {/* Formulario de alta de alumnos */}
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <AlumnoForm onGuardar={guardar}/>
                    </div>

                    {/* Listado y búsqueda de alumnos */}
                    <div className="col-12 col-lg-8">
                    <div className="mb-4">
                        <input className="form-control campo-casa" placeholder="🔍 Buscar por nombre o apellido..." value={busqueda}
                            onChange={
                                e =>
                                setBusqueda(
                                    e.target.value
                                )
                            }
                        />

                    </div>
                    <div className="contador-alumnos">
                        {
                            busqueda
                                ?
                                `🔍 ${alumnosFiltrados.length} coincidencia(s) para "${busqueda}"`
                                :
                                `👥 ${alumnosFiltrados.length} alumno(s) registrados`
                        }

                    </div>
                    <AlumnoList alumnos={alumnosFiltrados}
                        onEditar={
                            (a)=>setAlumnoEditando(a)
                        }
                    />
                    </div>
                </div>
                {/* Modal de edición */}
                {
                    alumnoEditando &&

                    <AlumnoModal alumno={alumnoEditando}
                        onCerrar={()=>
                            setAlumnoEditando(null)
                        }
                        onGuardar={actualizar}
                    />
                }
        </div>
    );
}

export default Alumnos;
