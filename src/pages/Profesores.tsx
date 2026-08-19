import { useEffect, useState } from "react";

import ProfesorForm from "../components/ProfesorForm";
import ProfesorList from "../components/ProfesorList";
import ProfesorModal from "../components/ProfesorModal";

import {
    obtenerProfesores,
    guardarProfesor,
    actualizarProfesor
} from "../services/profesorService";

/**
 * Pantalla principal de gestión de profesores.
 *
 * Permite:
 * - Registrar nuevos profesores.
 * - Consultar el listado completo.
 * - Buscar profesores por nombre o apellido.
 * - Editar la información de un profesor.
 */
function Profesores(){

    // Listado completo de profesores
    const [profesores, setProfesores] = useState([]);

    // Profesor seleccionado para editar
    const [profesorEditando, setProfesorEditando] = useState<any | null>(null);

    // Texto del buscador
    const [busqueda, setBusqueda] = useState("");

    /**
     * Carga inicial al abrir la pantalla.
     */
    useEffect(() => {
        cargar();
    }, []);

    /**
     * Obtiene todos los profesores desde la API.
     */
    const cargar = async () => {

        const data = await obtenerProfesores();

        setProfesores(data);

    };

    /**
     * Guarda un nuevo profesor y actualiza el listado.
     */
    const guardar = async(profesor:any)=>{

        await guardarProfesor(profesor);

        await cargar();

    };

    /**
     * Actualiza un profesor existente.
     */
    const actualizar = async(profesor:any)=>{

        await actualizarProfesor(profesor);

        setProfesorEditando(null);

        await cargar();

    };

    /**
     * Filtra profesores por nombre o apellido.
     */
    const profesoresFiltrados = profesores.filter(

        (p:any)=>

            p.nombre
                .toLowerCase()
                .includes(busqueda.toLowerCase())

            ||

            p.apellido
                .toLowerCase()
                .includes(busqueda.toLowerCase())

    );

    return(

        <div className="container mt-4">

            <h1 className="titulo-principal">

                CASA MOVIMIENTO

            </h1>

            <div className="row">

                {/* Formulario */}

                <div className="col-12 col-lg-4">

                    <ProfesorForm
                        onGuardar={guardar}
                    />

                </div>

                {/* Buscador y listado */}

                <div className="col-12 col-lg-8">

                    <div className="mb-4">

                        <input

                            className="form-control campo-casa"

                            placeholder="🔍 Buscar por nombre o apellido..."

                            value={busqueda}

                            onChange={
                                e=>
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

                            `🔍 ${profesoresFiltrados.length} coincidencia(s) para "${busqueda}"`

                            :

                            `👩‍🏫 ${profesoresFiltrados.length} profesor(es) registrados`

                        }

                    </div>

                    <ProfesorList

                        profesores={profesoresFiltrados}

                        onEditar={
                            (p)=>setProfesorEditando(p)
                        }

                    />

                </div>

            </div>

            {/* Modal */}

            {

                profesorEditando &&

                <ProfesorModal

                    profesor={profesorEditando}

                    onCerrar={()=>
                        setProfesorEditando(null)
                    }

                    onGuardar={actualizar}

                />

            }

        </div>

    );

}

export default Profesores;