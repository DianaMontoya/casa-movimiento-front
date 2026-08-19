import { useEffect, useState } from "react";
import {
    obtenerMovimientos,
    guardarMovimiento
} from "../services/movimientoService";


/**
 * Obtiene la fecha actual en formato YYYY-MM-DD.
 *
 * Es el formato que necesita el input type="date".
 * Visualmente, el navegador puede mostrarla como DD/MM/AAAA.
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
 * Pantalla de gestión de movimientos financieros.
 *
 * Permite registrar ingresos y egresos,
 * visualizar el historial de movimientos
 * y consultar el resumen financiero del día.
 */
function Movimientos() {

    // =========================
    // DATOS
    // =========================

    const [movimientos, setMovimientos] =
        useState<any[]>([]);


    // =========================
    // FORMULARIO
    // =========================

    const [tipo, setTipo] =
        useState("INGRESO");

    const [concepto, setConcepto] =
        useState("");

    const [monto, setMonto] =
        useState("");

    // Fecha actual por defecto
    const [fecha, setFecha] =
        useState(obtenerFechaActual());

    const [observaciones, setObservaciones] =
        useState("");


    /**
     * Carga inicial de movimientos.
     */
    useEffect(() => {

        cargar();

    }, []);


    /**
     * Obtiene todos los movimientos registrados
     * desde el backend.
     */
    const cargar = async () => {

        const data =
            await obtenerMovimientos();

        setMovimientos(data);

    };


    /**
     * Registra un nuevo movimiento financiero
     * y actualiza el listado.
     */
    const guardar = async () => {

        await guardarMovimiento({

            tipo,
            concepto,
            monto,
            fecha,
            observaciones

        });


        // =========================
        // LIMPIAR FORMULARIO
        // =========================

        setTipo("INGRESO");

        setConcepto("");

        setMonto("");

        // La fecha vuelve a ser la de hoy
        setFecha(
            obtenerFechaActual()
        );

        setObservaciones("");


        await cargar();

    };


    /**
     * Fecha actual utilizada para calcular
     * el resumen financiero diario.
     */
    const hoy =
        obtenerFechaActual();


    /**
     * Total de ingresos registrados durante el día.
     */
    const ingresosHoy =
        movimientos

            .filter(
                (m: any) =>
                    m.fecha === hoy &&
                    m.tipo === "INGRESO"
            )

            .reduce(
                (
                    acum: number,
                    m: any
                ) =>
                    acum +
                    Number(m.monto),

                0
            );


    /**
     * Total de egresos registrados durante el día.
     */
    const egresosHoy =
        movimientos

            .filter(
                (m: any) =>
                    m.fecha === hoy &&
                    m.tipo === "EGRESO"
            )

            .reduce(
                (
                    acum: number,
                    m: any
                ) =>
                    acum +
                    Number(m.monto),

                0
            );


    const resultadoHoy =
        ingresosHoy -
        egresosHoy;


    // =========================
    // RENDERIZADO
    // =========================

    return (

        <div className="container mt-4">

            <h1 className="titulo-principal">
                Ingresos y Egresos
            </h1>


            <div className="row">

                {/* =========================
                    FORMULARIO
                ========================= */}

                <div className="col-12 col-lg-4">

                    <div className="card-casa">

                        <div className="card-casa-body">

                            {/* Tipo */}

                            <select
                                className="form-control campo-casa"
                                value={tipo}
                                onChange={
                                    e =>
                                        setTipo(
                                            e.target.value
                                        )
                                }
                            >

                                <option value="INGRESO">
                                    INGRESO
                                </option>

                                <option value="EGRESO">
                                    EGRESO
                                </option>

                            </select>


                            {/* Concepto */}

                            <input
                                className="form-control campo-casa mt-2"
                                placeholder="Concepto"
                                value={concepto}
                                onChange={
                                    e =>
                                        setConcepto(
                                            e.target.value
                                        )
                                }
                            />


                            {/* Monto */}

                            <input
                                className="form-control campo-casa mt-2"
                                placeholder="Monto"
                                value={monto}
                                onChange={
                                    e =>
                                        setMonto(
                                            e.target.value
                                        )
                                }
                            />


                            {/* Fecha */}

                            <input
                                type="date"
                                className="form-control campo-casa mt-2"
                                value={fecha}
                                onChange={
                                    e =>
                                        setFecha(
                                            e.target.value
                                        )
                                }
                            />


                            {/* Observaciones */}

                            <textarea
                                className="form-control campo-casa mt-2"
                                placeholder="Observaciones"
                                value={observaciones}
                                onChange={
                                    e =>
                                        setObservaciones(
                                            e.target.value
                                        )
                                }
                            />


                            {/* Guardar */}

                            <button
                                className="btn-casa mt-3"
                                onClick={guardar}
                            >
                                Guardar Movimiento
                            </button>

                        </div>

                    </div>

                </div>


                {/* =========================
                    RESUMEN + LISTADO
                ========================= */}

                <div className="col-12 col-lg-8">

                    <div className="lista-casa">

                        {/* =========================
                            RESUMEN FINANCIERO
                        ========================= */}

                        <div className="resumen-financiero movimientos-resumen">

                            {/* INGRESOS */}

                            <div className="card-balance movimiento-card ingreso">

                                <div className="movimiento-card-titulo">

                                    <span>
                                        💰
                                    </span>

                                    <span>
                                        INGRESOS
                                    </span>

                                </div>


                                <div className="movimiento-card-monto">

                                    <h5>
                                        $
                                        {
                                            ingresosHoy.toLocaleString()
                                        }
                                    </h5>

                                </div>


                                <div className="movimiento-card-subtitulo">

                                    Recaudación del día

                                </div>

                            </div>


                            {/* EGRESOS */}

                            <div className="card-balance movimiento-card egreso">

                                <div className="movimiento-card-titulo">

                                    <span>
                                        💸
                                    </span>

                                    <span>
                                        EGRESOS
                                    </span>

                                </div>


                                <div className="movimiento-card-monto">

                                    <h5>
                                        $
                                        {
                                            egresosHoy.toLocaleString()
                                        }
                                    </h5>

                                </div>


                                <div className="movimiento-card-subtitulo">

                                    Gastos del día

                                </div>

                            </div>


                            {/* RESULTADO */}

                            <div className="card-balance movimiento-card resultado">

                                <div className="movimiento-card-titulo">

                                    <span>
                                        📈
                                    </span>

                                    <span>
                                        RESULTADO
                                    </span>

                                </div>


                                <div
                                    className={
                                        resultadoHoy >= 0
                                            ? "movimiento-card-monto"
                                            : "movimiento-card-monto negativo"
                                    }
                                >

                                    <h5>
                                        $
                                        {
                                            resultadoHoy.toLocaleString()
                                        }
                                    </h5>

                                </div>


                                <div className="movimiento-card-subtitulo">

                                    Balance del día

                                </div>

                            </div>

                        </div>


                        {/* =========================
                            TÍTULO
                        ========================= */}

                        <div className="lista-casa-header">

                            <h2>
                                Movimientos Registrados
                            </h2>

                        </div>


                        {/* =========================
                            TABLA
                        ========================= */}

                        <div className="tabla-movimientos">

                            {/* Encabezados */}

                            <div className="fila-movimiento fila-movimiento-header">

                                <div>
                                    CONCEPTO
                                </div>

                                <div>
                                    FECHA
                                </div>

                                <div>
                                    TIPO
                                </div>

                                <div>
                                    MONTO
                                </div>

                            </div>


                            {/* Movimientos */}

                            {
                                [...movimientos]

                                    .sort(
                                        (
                                            a: any,
                                            b: any
                                        ) =>
                                            new Date(
                                                b.fecha
                                            ).getTime()
                                            -
                                            new Date(
                                                a.fecha
                                            ).getTime()
                                    )

                                    .map(
                                        (m: any) =>

                                            <div
                                                key={m.id}
                                                className="fila-movimiento"
                                            >

                                                {/* Concepto */}

                                                <div>

                                                    <div className="nombre-alumno">

                                                        {
                                                            m.concepto
                                                        }

                                                    </div>

                                                </div>


                                                {/* Fecha */}

                                                <div>

                                                    <small>

                                                        {
                                                            m.fecha
                                                                ? m.fecha
                                                                    .split("-")
                                                                    .reverse()
                                                                    .join("-")
                                                                : ""
                                                        }

                                                    </small>

                                                </div>


                                                {/* Tipo */}

                                                <div>

                                                    <span
                                                        className={
                                                            m.tipo === "INGRESO"
                                                                ? "estado-ingreso"
                                                                : "estado-egreso"
                                                        }
                                                    >

                                                        {
                                                            m.tipo
                                                        }

                                                    </span>

                                                </div>


                                                {/* Monto */}

                                                <div className="monto-movimiento">

                                                    <strong>

                                                        $

                                                        {
                                                            Number(
                                                                m.monto
                                                            )
                                                                .toLocaleString()
                                                        }

                                                    </strong>

                                                </div>

                                            </div>
                                    )
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Movimientos;