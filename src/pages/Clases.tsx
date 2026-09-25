import { useEffect, useState } from "react";

import ClaseList from "../components/ClaseList";
import ClaseModal from "../components/ClaseModal";
import ClaseNuevoModal from "../components/ClaseNuevoModal";

import {
    obtenerClases,
    guardarClase,
    actualizarClase
} from "../services/claseService";


/**
 * Pantalla principal de gestión de clases.
 *
 * Coordina:
 * - listado
 * - alta
 * - edición
 */
function Clases() {

    // =========================
    // ESTADOS
    // =========================

    const [clases, setClases] =
        useState<any[]>([]);

    const [claseEditando, setClaseEditando] =
        useState<any | null>(null);

    const [mostrarNuevaClase, setMostrarNuevaClase] =
        useState(false);


    // =========================
    // CARGA INICIAL
    // =========================

    useEffect(() => {

        cargar();

    }, []);


    // =========================
    // CARGAR CLASES
    // =========================

    const cargar = async () => {

        const data = await obtenerClases();

        setClases(data);

    };


    // =========================
    // GUARDAR NUEVA CLASE
    // =========================

    const guardar = async (clase: any) => {

        await guardarClase(clase);

        await cargar();

    };


    // =========================
    // ACTUALIZAR CLASE
    // =========================

    const actualizar = async (clase: any) => {

        await actualizarClase(clase);

        setClaseEditando(null);

        await cargar();

    };


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
                    CLASES
                </h1>

                <button
                    className="btn-casa"
                    onClick={() =>
                        setMostrarNuevaClase(true)
                    }
                    type="button"
                >
                    + Nueva Clase
                </button>

            </div>


            {/* =========================
                LISTADO
            ========================= */}

            <ClaseList
                clases={clases}
                onEditar={setClaseEditando}
            />


            {/* =========================
                MODAL NUEVA CLASE
            ========================= */}

            {
                mostrarNuevaClase &&

                <ClaseNuevoModal

                    onCerrar={() =>
                        setMostrarNuevaClase(false)
                    }

                    onGuardar={guardar}

                />
            }


            {/* =========================
                MODAL EDITAR CLASE
            ========================= */}

            {
                claseEditando && (

                    <ClaseModal
                        clase={claseEditando}
                        onCerrar={() =>
                            setClaseEditando(null)
                        }
                        onGuardar={actualizar}
                    />

                )
            }

        </div>

    );

}

export default Clases;

