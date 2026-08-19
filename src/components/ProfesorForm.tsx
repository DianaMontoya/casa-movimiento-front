import { useState } from "react";

type Props = {
    onGuardar: (profesor:any)=>void;
};

function ProfesorForm({ onGuardar }:Props){

    const [nombre,setNombre]=useState("");
    const [apellido,setApellido]=useState("");
    const [fechaNacimiento,setFechaNacimiento]=useState("");
    const [dni,setDni]=useState("");
    const [telefono,setTelefono]=useState("");
    const [email,setEmail]=useState("");
    const [fechaIngreso,setFechaIngreso]=useState("");
    const [especialidad,setEspecialidad]=useState("");
    const [observaciones,setObservaciones]=useState("");
    const [activo,setActivo]=useState(true);

    const guardar=()=>{

        onGuardar({

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

    return(

        <div className="card-casa">

            <div className="card-casa-header">

                <h2 className="m-0">

                    Nuevo Profesor

                </h2>

            </div>

            <div className="card-casa-body">

                <div className="mb-3">
                    <label className="label-casa">Nombre</label>
                    <input className="form-control campo-casa"
                        value={nombre}
                        onChange={e=>setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="label-casa">Apellido</label>
                    <input className="form-control campo-casa"
                        value={apellido}
                        onChange={e=>setApellido(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="label-casa">Fecha de Nacimiento</label>
                    <input type="date"
                        className="form-control campo-casa"
                        value={fechaNacimiento}
                        onChange={e=>setFechaNacimiento(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="label-casa">DNI</label>
                    <input className="form-control campo-casa"
                        value={dni}
                        onChange={e=>setDni(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="label-casa">Teléfono</label>
                    <input className="form-control campo-casa"
                        value={telefono}
                        onChange={e=>setTelefono(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="label-casa">Email</label>
                    <input type="email"
                        className="form-control campo-casa"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="label-casa">Fecha de Ingreso</label>
                    <input type="date"
                        className="form-control campo-casa"
                        value={fechaIngreso}
                        onChange={e=>setFechaIngreso(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="label-casa">Especialidad</label>
                    <input className="form-control campo-casa"
                        value={especialidad}
                        onChange={e=>setEspecialidad(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="label-casa">Observaciones</label>
                    <textarea
                        className="form-control campo-casa"
                        value={observaciones}
                        onChange={e=>setObservaciones(e.target.value)}
                    />
                </div>

                <div className="mb-4">

                    <label className="label-casa">

                        Estado

                    </label>

                    <select

                        className="form-control campo-casa"

                        value={activo ? "ACTIVO" : "INACTIVO"}

                        onChange={

                            e=>setActivo(

                                e.target.value==="ACTIVO"

                            )

                        }

                    >

                        <option value="ACTIVO">ACTIVO</option>

                        <option value="INACTIVO">INACTIVO</option>

                    </select>

                </div>

                <button

                    className="btn-casa w-100"

                    onClick={guardar}

                >

                    Guardar Profesor

                </button>

            </div>

        </div>

    );

}

export default ProfesorForm;