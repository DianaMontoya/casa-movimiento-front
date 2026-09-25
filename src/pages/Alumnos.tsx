
import { useEffect, useState } from "react";

import AlumnoList from "../components/AlumnoList";
import AlumnoModal from "../components/AlumnoModal";
import AlumnoNuevoModal from "../components/AlumnoNuevoModal";

import {
    obtenerAlumnos,
    guardarAlumno,
    actualizarAlumno
} from "../services/alumnoService";


/**
 * Pantalla principal de gestión de alumnos.
 *
 * La página coordina:
 * - listado
 * - búsqueda
 * - edición
 * - apertura del modal de alta
 */
function Alumnos() {

    // =========================
    // ESTADOS
    // =========================

    const [alumnos, setAlumnos] = useState<any[]>([]);

    const [alumnoEditando, setAlumnoEditando] =
        useState<any | null>(null);

    const [mostrarNuevoAlumno, setMostrarNuevoAlumno] =
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
    // OBTENER ALUMNOS
    // =========================

    const cargar = async () => {

        const data = await obtenerAlumnos();

        setAlumnos(data);

    };


    // =========================
    // GUARDAR NUEVO ALUMNO
    // =========================

    const guardar = async (alumno: any) => {

        await guardarAlumno(alumno);

        await cargar();

    };


    // =========================
    // ACTUALIZAR ALUMNO
    // =========================

    const actualizar = async (alumno: any) => {

        await actualizarAlumno(alumno);

        setAlumnoEditando(null);

        await cargar();

    };


    // =========================
    // FILTRO
    // =========================

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


    // =========================
    // RENDER
    // =========================

    return (

        <div className="container mt-4">

            {/* =========================
                ENCABEZADO
            ========================= */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h1 className="titulo-principal">
                        ALUMNOS
                    </h1>

                </div>


                <button
                    className="btn-casa"
                    onClick={() =>
                        setMostrarNuevoAlumno(true)
                    }
                    type="button"
                >
                    + Nuevo Alumno
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

                        `🔍 ${alumnosFiltrados.length} coincidencia(s) para "${busqueda}"`

                        :

                        `👥 ${alumnosFiltrados.length} alumno(s) registrados`
                }

            </div>


            {/* =========================
                LISTADO
            ========================= */}

            <AlumnoList
                alumnos={alumnosFiltrados}
                onEditar={a =>
                    setAlumnoEditando(a)
                }
            />


            {/* =========================
                MODAL NUEVO ALUMNO
            ========================= */}

            {
                mostrarNuevoAlumno &&

                <AlumnoNuevoModal

                    onCerrar={() =>
                        setMostrarNuevoAlumno(false)
                    }

                    onGuardar={guardar}

                />
            }


            {/* =========================
                MODAL EDITAR ALUMNO
            ========================= */}

            {
                alumnoEditando &&

                <AlumnoModal

                    alumno={alumnoEditando}

                    onCerrar={() =>
                        setAlumnoEditando(null)
                    }

                    onGuardar={actualizar}

                />
            }

        </div>

    );

}

export default Alumnos;


