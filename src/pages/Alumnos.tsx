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

function App(){
    const[alumnos, setAlumnos]=useState([]);
    const [alumnoEditando, setAlumnoEditando] =useState<any | null>(null);
    const [busqueda, setBusqueda] = useState('');

    useEffect(()=>{
        cargar();
    },[]);

    const guardar=
        async(alumno:any)=>{
        await guardarAlumno(
            alumno
        );
        await cargar();
    };

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
    const cargar= async()=>{
        const data= await obtenerAlumnos();
        setAlumnos(data);
    };


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
    return(
    <div className="container mt-4">

            <h1 className="titulo-principal">
                CASA MOVIMIENTO
            </h1>
          
            <div className="row">

                <div className="col-12 col-lg-4">

                    <AlumnoForm
                        onGuardar={guardar}
                    />

                </div>

                <div className="col-12 col-lg-8">
                  <div className="mb-4">

                    <input
                        className="form-control campo-casa"
                        placeholder="🔍 Buscar por nombre o apellido..."
                        value={busqueda}
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
                <AlumnoList
                    alumnos={alumnosFiltrados}
                    onEditar={
                        (a)=>setAlumnoEditando(a)
                    }
                />

                </div>

            </div>

        {
            alumnoEditando &&

            <AlumnoModal
                alumno={alumnoEditando}
                onCerrar={()=>
                    setAlumnoEditando(null)
                }
                onGuardar={actualizar}
            />
        }
    </div>


    );
}

export default App;
