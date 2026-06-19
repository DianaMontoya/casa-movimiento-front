import {useState} from 'react';

/** * Props del modal de edición de alumnos. * 
 * Recibe el alumno seleccionado, las acciones de cierre y la función encargada de persistir los cambios. */
type Props = {
    alumno:any;
    onCerrar:()=>void;
    onGuardar:
    (alumno:any)=>void;
};

/** * Modal utilizado para visualizar y editar la información básica de un alumno existente. */
function AlumnoModal(
{
    alumno,
    onCerrar,
    onGuardar
}:Props
){
    // Si no existe un alumno seleccionado, no se renderiza el modal
    if(!alumno)
        return null;
    
    // Estados locales utilizados para editar los datos del alumno
    const [ nombre, setNombre ] = useState( alumno.nombre );
    const [ apellido, setApellido ] = useState( alumno.apellido);

    /** * Construye el objeto actualizado conservando los datos originales y reemplazando los campos modificados. */
    const guardarCambios=()=>{
        onGuardar({
            ...alumno,
            nombre,
            apellido
        });
    };

    // Renderizado del modal de edición
    return(
        <div className="modal-overlay">

            <div className="modal-casa">
                <h2>
                    Editar Alumno
                </h2>

                <hr/>

                {/* Campo editable: Nombre */}  
                <div className="mb-3">
                    <label>
                        Nombre
                    </label>

                    <input className="form-control" value={nombre}
                        onChange={
                            e=>
                            setNombre(
                                e.target.value
                            )
                        }
                    />
                </div>

               {/* Campo editable: Apellido */}
               <div className="mb-3">
                    <label>
                        Apellido
                    </label>

                    <input className="form-control" value={apellido}
                        onChange={
                            e=>
                            setApellido(
                                e.target.value
                            )
                        }
                    />
                </div>

                {/* Información de solo lectura */}
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
                    <button className="btn-casa" onClick={guardarCambios}>
                        Guardar Cambios
                    </button>

                    <button className="btn btn-secondary" onClick={onCerrar}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AlumnoModal;