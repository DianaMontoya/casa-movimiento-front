import { useEffect, useState } from "react";

import MovimientoList from "../components/MovimientoList";
import MovimientoModal from "../components/MovimientoModal";
import MovimientoNuevoModal from "../components/MovimientoNuevoModal";

import {
    obtenerMovimientos,
    guardarMovimiento,
    actualizarMovimiento
} from "../services/movimientoService";


/**
 * Obtiene la fecha actual en formato YYYY-MM-DD.
 *
 * Se utiliza para comparar correctamente las fechas
 * de los movimientos sin problemas de zona horaria.
 */
const obtenerFechaActual = () => {

    const hoy = new Date();

    const year = hoy.getFullYear();

    const month = String(
        hoy.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        hoy.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
};


/**
 * Formatea un monto para mostrarlo
 * de manera amigable en la interfaz.
 */
const formatearMonto = (monto: number) => {

    return monto.toLocaleString(
        "es-AR",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

};


/**
 * Pantalla principal de gestión de movimientos.
 *
 * Coordina:
 * - resumen de ingresos y egresos del día
 * - listado de movimientos
 * - alta de movimientos
 * - edición de movimientos
 */
function Movimientos() {

    // =========================
    // ESTADOS
    // =========================

    const [movimientos, setMovimientos] =
        useState<any[]>([]);

    const [movimientoEditando, setMovimientoEditando] =
        useState<any | null>(null);

    const [mostrarNuevoMovimiento, setMostrarNuevoMovimiento] =
        useState(false);


    // =========================
    // CARGA INICIAL
    // =========================

    useEffect(() => {

        cargar();

    }, []);


    // =========================
    // CARGAR MOVIMIENTOS
    // =========================

    const cargar = async () => {

        const data = await obtenerMovimientos();

        setMovimientos(data);

    };


    // =========================
    // GUARDAR NUEVO MOVIMIENTO
    // =========================

    const guardar = async (movimiento: any) => {

        await guardarMovimiento(movimiento);

        await cargar();

    };


    // =========================
    // ACTUALIZAR MOVIMIENTO
    // =========================

    const actualizar = async (movimiento: any) => {

        await actualizarMovimiento(movimiento);

        setMovimientoEditando(null);

        await cargar();

    };


    // =========================
    // RESUMEN DEL DÍA
    // =========================

    const hoy = obtenerFechaActual();


    const ingresosHoy = movimientos
        .filter(
            (m: any) =>
                m.fecha === hoy &&
                m.tipo === "INGR"
        )
        .reduce(
            (
                total: number,
                m: any
            ) =>
                total + Number(m.monto || 0),
            0
        );


    const egresosHoy = movimientos
        .filter(
            (m: any) =>
                m.fecha === hoy &&
                m.tipo === "EGRESO"
        )
        .reduce(
            (
                total: number,
                m: any
            ) =>
                total + Number(m.monto || 0),
            0
        );


    const resultadoHoy =
        ingresosHoy - egresosHoy;


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
                    MOVIMIENTOS
                </h1>

                <button
                    className="btn-casa"
                    onClick={() =>
                        setMostrarNuevoMovimiento(true)
                    }
                    type="button"
                >
                    + Nuevo Movimiento
                </button>

            </div>


            {/* =========================
                RESUMEN DEL DÍA
            ========================= */}

            <div className="movimientos-resumen">

                {/* INGRESOS */}

                <div className="movimiento-card">

                    <div className="movimiento-card-titulo">
                        Ingresos de hoy
                    </div>

                    <div className="movimiento-card-monto">

                        $ {formatearMonto(ingresosHoy)}

                    </div>

                </div>


                {/* EGRESOS */}

                <div className="movimiento-card">

                    <div className="movimiento-card-titulo">
                        Egresos de hoy
                    </div>

                    <div className="movimiento-card-monto">

                        $ {formatearMonto(egresosHoy)}

                    </div>

                </div>


                {/* RESULTADO */}

                <div className="movimiento-card resultado">

                    <div className="movimiento-card-titulo">
                        Resultado
                    </div>

                    <div className="movimiento-card-monto">

                        $ {formatearMonto(resultadoHoy)}

                    </div>

                </div>

            </div>


            {/* =========================
                LISTADO
            ========================= */}

            <MovimientoList

                movimientos={movimientos}

                onSeleccionar={
                    (movimiento: any) =>
                        setMovimientoEditando(movimiento)
                }

            />


            {/* =========================
                MODAL NUEVO MOVIMIENTO
            ========================= */}

            {
                mostrarNuevoMovimiento && (

                    <MovimientoNuevoModal

                        onCerrar={() =>
                            setMostrarNuevoMovimiento(false)
                        }

                        onGuardar={guardar}

                    />

                )
            }


            {/* =========================
                MODAL EDITAR MOVIMIENTO
            ========================= */}

            {
                movimientoEditando && (

                    <MovimientoModal

                        movimiento={movimientoEditando}

                        onCerrar={() =>
                            setMovimientoEditando(null)
                        }

                        onGuardar={actualizar}

                    />

                )
            }

        </div>

    );

}

export default Movimientos;

