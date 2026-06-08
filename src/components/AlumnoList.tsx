type Props = {

    alumnos:any[];

    onEditar:
    (alumno:any)=>void;

};

function AlumnoList(
{
    alumnos,
    onEditar
}:Props
){

    const obtenerClaseEstado =
    (estado:string)=>{

        if(estado==="ACTIVO")
            return "estado-activo";

        if(estado==="DEUDOR")
            return "estado-deudor";

        return "estado-inactivo";

    };

    return(

        <div className="lista-casa">

            <div className="lista-casa-header">

                <h2 className="m-0">

                    Alumnos Registrados

                </h2>

            </div>

            {

                alumnos.map(

                    a=>

                    <div
                        className="fila-alumno"
                        key={a.id}
                    >

                        <div>

                            <div className="nombre-alumno">

                                {a.apellido}
                                {" "}
                                {a.nombre}

                            </div>

                        </div>

                        <div>

                            <span
                                className={
                                    `badge-estado ${obtenerClaseEstado(a.estado)}`
                                }
                            >

                                {a.estado}

                            </span>

                        </div>

                        <div>

                            <button
                                className="btn-editar"
                                onClick={
                                    ()=>onEditar(a)
                                }
                            >

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