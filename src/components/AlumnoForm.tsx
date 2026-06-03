import {useState}
from 'react';

type Props = {
    onGuardar: (alumno:any)=>void;
};

function AlumnoForm(
    {
    onGuardar
    }:Props
){
    const[
        nombre,
        setNombre
    ]=useState('');

    const[
        apellido,
        setApellido
    ]=useState('');

    const guardar=()=>{
        onGuardar({
            nombre,
            apellido,
            estado: "ACTIVO"
        });
    };
    return(
  <div className="card-casa">

        <div className="card-casa-header">

            <h2 className="m-0">
                Nuevo Alumno
            </h2>

        </div>

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

            <button
                className="btn-casa w-100"
                onClick={guardar}
            >
                Guardar Alumno
            </button>

        </div>

    </div>
    );
}

export default AlumnoForm;