import { useEffect, useState } from "react";

import ClaseForm from "../components/ClaseForm";
import ClaseList from "../components/ClaseList";
import ClaseModal from "../components/ClaseModal";

import {
    obtenerClases,
    guardarClase,
    actualizarClase
} from "../services/claseService";

/**
 * Pantalla principal de gestión de clases.
 *
 * Permite:
 * - Crear clases
 * - Listarlas
 * - Editarlas
 */
function Clases() {

    const [clases, setClases] = useState([]);
    const [claseEditando, setClaseEditando] = useState<any | null>(null);

    /**
     * Carga inicial
     */
    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        const data = await obtenerClases();
        setClases(data);
    };

    /**
     * Guardar nueva clase
     */
    const guardar = async (clase: any) => {
        await guardarClase(clase);
        await cargar();
    };

    /**
     * Actualizar clase existente
     */
    const actualizar = async (clase: any) => {
        await actualizarClase(clase);
        setClaseEditando(null);
        await cargar();
    };

    return (

        <div className="container mt-4">

            <h1 className="titulo-principal">
                Clases
            </h1>

            <div className="row">

                {/* Formulario */}
                <div className="col-12 col-lg-4">
                    <ClaseForm onGuardar={guardar} />
                </div>

                {/* Listado */}
                <div className="col-12 col-lg-8">

                    <ClaseList
                        clases={clases}
                        onEditar={setClaseEditando}
                    />

                </div>

            </div>

            {/* Modal edición */}
            {
                claseEditando && (
                    <ClaseModal
                        clase={claseEditando}
                        onCerrar={() => setClaseEditando(null)}
                        onGuardar={actualizar}
                    />
                )
            }

        </div>

    );

}

export default Clases;