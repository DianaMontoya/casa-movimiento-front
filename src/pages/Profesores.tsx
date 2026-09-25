import { useEffect, useState } from "react";

import ProfesorList from "../components/ProfesorList";
import ProfesorModal from "../components/ProfesorModal";
import ProfesorNuevoModal from "../components/ProfesorNuevoModal";

import {
    obtenerProfesores,
    guardarProfesor,
    actualizarProfesor
} from "../services/profesorService";


/**
 * Pantalla principal de gestión de profesores.
 *
 * Coordina:
 * - listado
 * - búsqueda
 * - alta
 * - edición
 */
function Profesores() {

    // =========================
    // ESTADOS
    // =========================

    const [profesores, setProfesores] =
        useState<any[]>([]);

    const [profesorEditando, setProfesorEditando] =
        useState<any | null>(null);

    const [mostrarNuevoProfesor, setMostrarNuevoProfesor] =
        useState(false);

    const [busqueda, setBusqueda] =
        useState("");


    // =========================
    // CARGA INICIAL
    // =========================

    useEffect(() => {

        cargar();

    }, []);


    // =========================
    // CARGAR PROFESORES
    // =========================

    const cargar = async () => {

        const data = await obtenerProfesores();

        setProfesores(data);

    };


    // =========================
    // GUARDAR NUEVO
    // =========================

    const guardar = async (profesor: any) => {

        await guardarProfesor(profesor);

        await cargar();

    };


    // =========================
    // ACTUALIZAR
    // =========================

    const actualizar = async (profesor: any) => {

        await actualizarProfesor(profesor);

        setProfesorEditando(null);

        await cargar();

    };


    // =========================
    // FILTRAR
    // =========================

    const profesoresFiltrados = profesores.filter(

        (p: any) =>

            p.nombre
                .toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                )

            ||

            p.apellido
                .toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                )

    );


    // =========================
    // RENDER
    // =========================

    return (

        <div className="container mt-4">

            {/* =========================
                ENCABEZADO
            ========================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h1 className="titulo-principal">
                    PROFESORES
                </h1>

                <button
                    className="btn-casa"
                    onClick={() =>
                        setMostrarNuevoProfesor(true)
                    }
                    type="button"
                >
                    + Nuevo Profesor
                </button>

            </div>


            {/* =========================
                BUSCADOR
            ========================= */}

            <div className="mb-4">

                <input
                    className="form-control campo-casa"
                    placeholder="🔍 Buscar por nombre o apellido..."
                    value={busqueda}
                    onChange={e =>
                        setBusqueda(e.target.value)
                    }
                />

            </div>


            {/* =========================
                CONTADOR
            ========================= */}

            <div className="contador-alumnos">

                {
                    busqueda

                        ?

                        `🔍 ${profesoresFiltrados.length} coincidencia(s) para "${busqueda}"`

                        :

                        `👩‍🏫 ${profesoresFiltrados.length} profesor(es) registrados`
                }

            </div>


            {/* =========================
                LISTADO
            ========================= */}

            <ProfesorList
                profesores={profesoresFiltrados}
                onEditar={p =>
                    setProfesorEditando(p)
                }
            />


            {/* =========================
                MODAL NUEVO PROFESOR
            ========================= */}

            {
                mostrarNuevoProfesor &&

                <ProfesorNuevoModal

                    onCerrar={() =>
                        setMostrarNuevoProfesor(false)
                    }

                    onGuardar={guardar}

                />
            }


            {/* =========================
                MODAL EDITAR PROFESOR
            ========================= */}

            {
                profesorEditando &&

                <ProfesorModal

                    profesor={profesorEditando}

                    onCerrar={() =>
                        setProfesorEditando(null)
                    }

                    onGuardar={actualizar}

                />
            }

        </div>

    );

}

export default Profesores;

