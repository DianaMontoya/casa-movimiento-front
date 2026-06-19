
/** * Props de la lista de alumnos. 
 * * Recibe la colección de alumnos y la función que permite editar un registro seleccionado. */
type Props = {
    alumnos:any[];
    onEditar:
    (alumno:any)=>void;

};

/** * Componente encargado de mostrar el listado de alumnos registrados en el sistema. 
 *  * Permite visualizar el estado actual de cada alumno * y acceder a la edición de sus datos. */
function AlumnoList(
{
    alumnos,
    onEditar
}:Props
){

    /** * Determina la clase CSS a utilizar según el estado del alumno para aplicar estilos visuales. */
    const obtenerClaseEstado =
    (estado:string)=>{
        if(estado==="ACTIVO")
            return "estado-activo";
        if(estado==="DEUDOR")
            return "estado-deudor";
        return "estado-inactivo";
    };

    // Renderizado de la lista de alumnos
    return(
        <div className="lista-casa">
            <div className="lista-casa-header">
                <h2 className="m-0">
                    Alumnos Registrados
                </h2>
            </div>

            {/* Listado de alumnos */}
            {
                alumnos.map(
                    a=>
                    <div className="fila-alumno" key={a.id}>
                        <div>
                            {/* Datos principales del alumno */}
                            <div className="nombre-alumno">
                                {a.apellido}
                                {" "}
                                {a.nombre}
                            </div>
                        </div>

                        <div>
                            <span className={`badge-estado ${obtenerClaseEstado(a.estado)}`}>
                                {a.estado}
                            </span>

                        </div>

                        {/* Acción de edición */}
                        <div>
                            <button className="btn-editar" onClick={()=>onEditar(a)}>
                                Editar
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default AlumnoList;