import {useEffect,useState} from 'react';
import AlumnoList from './components/AlumnoList';
import AlumnoForm from './components/AlumnoForm';

import {
    obtenerAlumnos,
    guardarAlumno
}from './services/alumnoService';

function App(){
    const[
        alumnos,
        setAlumnos
    ]=useState([]);

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

    const cargar= async()=>{
        const data= await obtenerAlumnos();
        setAlumnos(data);
    };

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

                <AlumnoList
                    alumnos={alumnos}
                    onEditar={
                        (a)=>console.log(a)
                    }
                />

            </div>

        </div>

    </div>

    );
}

export default App;