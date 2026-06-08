import {useState} from 'react';

type Props = {

    alumno:any;

    onCerrar:()=>void;

    onGuardar:
    (alumno:any)=>void;

};

function AlumnoModal(
{
    alumno,
    onCerrar,
    onGuardar
}:Props
){

    if(!alumno)
        return null;
        const [
            nombre,
            setNombre
        ] = useState(
            alumno.nombre
        );

        const [
            apellido,
            setApellido
        ] = useState(
            alumno.apellido
        );


        const guardarCambios=()=>{

            onGuardar({

                ...alumno,

                nombre,

                apellido

            });

        };
    return(

        <div className="modal-overlay">

            <div className="modal-casa">

                <h2>
                    Editar Alumno
                </h2>

                <hr/>

                <div className="mb-3">

                    <label>
                        Nombre
                    </label>

                    <input

                        className="form-control"

                        value={nombre}

                        onChange={
                            e=>
                            setNombre(
                                e.target.value
                            )
                        }

                    />

                </div>

               <div className="mb-3">

                    <label>
                        Apellido
                    </label>

                    <input

                        className="form-control"

                        value={apellido}

                        onChange={
                            e=>
                            setApellido(
                                e.target.value
                            )
                        }

                    />

                </div>

                <p>
                    <strong>DNI:</strong>
                    {" "}
                    {alumno.dni}
                </p>

                <p>
                    <strong>Email:</strong>
                    {" "}
                    {alumno.email}
                </p>

               

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

export default AlumnoModal;