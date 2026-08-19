import { useState } from "react";
import { obtenerBalance } from "../services/balanceService";

/**
 * Pantalla de balance financiero.
 *
 * Permite consultar la recaudación dentro de un rango
 * de fechas determinado y filtrar por método de pago.
 */
function Balance() {

    // =========================
    // FILTROS
    // =========================

    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [metodo, setMetodo] = useState("TODOS");


    // =========================
    // RESULTADOS
    // =========================

    const [pagos, setPagos] = useState<any[]>([]);


    /**
     * Consulta los pagos según los filtros seleccionados.
     */
    const buscar = async () => {

        const data = await obtenerBalance(
            desde,
            hasta,
            metodo
        );

        setPagos(data);

    };


    // =========================
    // TOTALES
    // =========================

    /** Total general de pagos encontrados. */
    const total =
        pagos.reduce(
            (
                acum: number,
                p: any
            ) =>
                acum + Number(p.monto),

            0
        );


    /** Total en efectivo. */
    const totalEfectivo =
        pagos
            .filter(
                (p: any) =>
                    p.metodoPago === "Efectivo"
            )
            .reduce(
                (
                    acum: number,
                    p: any
                ) =>
                    acum + Number(p.monto),

                0
            );


    /** Total por transferencia. */
    const totalTransferencia =
        pagos
            .filter(
                (p: any) =>
                    p.metodoPago === "Transferencia"
            )
            .reduce(
                (
                    acum: number,
                    p: any
                ) =>
                    acum + Number(p.monto),

                0
            );


    /** Total por Mercado Pago. */
    const totalMercadoPago =
        pagos
            .filter(
                (p: any) =>
                    p.metodoPago === "Mercado Pago"
            )
            .reduce(
                (
                    acum: number,
                    p: any
                ) =>
                    acum + Number(p.monto),

                0
            );


    /**
     * Formatea una fecha YYYY-MM-DD
     * sin utilizar new Date(), evitando
     * problemas de zona horaria.
     */
    const formatearFecha = (fecha: string) => {

        if (!fecha) {
            return "";
        }

        const partes = fecha.split("-");

        return `${partes[2]}-${partes[1]}-${partes[0]}`;

    };


    // =========================
    // RENDER
    // =========================

    return (

        <div className="container mt-4">

            <h1 className="titulo-principal">
                Balance
            </h1>


            {/* =========================
                FILTROS + RESUMEN
            ========================= */}

            <div className="balance-superior">

                {/* =========================
                    COLUMNA IZQUIERDA
                ========================= */}

                <div className="card-casa balance-filtros">

                    <div className="card-casa-header">

                        <h2>
                            Consultar Balance
                        </h2>

                    </div>


                    <div className="card-casa-body">

                        <label className="balance-label">
                            Desde
                        </label>

                        <input
                            type="date"
                            className="form-control campo-casa mb-2"
                            value={desde}
                            onChange={
                                e =>
                                    setDesde(
                                        e.target.value
                                    )
                            }
                        />


                        <label className="balance-label">
                            Hasta
                        </label>

                        <input
                            type="date"
                            className="form-control campo-casa mb-2"
                            value={hasta}
                            onChange={
                                e =>
                                    setHasta(
                                        e.target.value
                                    )
                            }
                        />


                        <label className="balance-label">
                            Método de pago
                        </label>

                        <select
                            className="form-control campo-casa mb-3"
                            value={metodo}
                            onChange={
                                e =>
                                    setMetodo(
                                        e.target.value
                                    )
                            }
                        >

                            <option value="TODOS">
                                TODOS
                            </option>

                            <option value="Efectivo">
                                Efectivo
                            </option>

                            <option value="Transferencia">
                                Transferencia
                            </option>

                            <option value="Mercado Pago">
                                Mercado Pago
                            </option>

                        </select>


                        <button
                            className="btn-casa"
                            onClick={buscar}
                        >
                            Buscar
                        </button>

                    </div>

                </div>


                {/* =========================
                    COLUMNA DERECHA
                ========================= */}

                <div className="card-casa balance-resumen">

                    <div className="card-casa-header">

                        <h2>
                            Resumen de Recaudación
                        </h2>

                    </div>


                    <div className="card-casa-body">

                        {

                            metodo === "TODOS"

                                ?

                                <div className="balance-resumen-grid">

                                    {/* Efectivo */}

                                    <div className="balance-resumen-item">

                                        <div className="balance-item-titulo">
                                            <span>💵</span>
                                            <span>EFECTIVO</span>
                                        </div>

                                        <div className="balance-item-monto">
                                            $
                                            {
                                                totalEfectivo.toLocaleString()
                                            }
                                        </div>

                                    </div>


                                    {/* Transferencia */}

                                    <div className="balance-resumen-item">

                                        <div className="balance-item-titulo">
                                            <span>🏦</span>
                                            <span>TRANSFERENCIA</span>
                                        </div>

                                        <div className="balance-item-monto">
                                            $
                                            {
                                                totalTransferencia.toLocaleString()
                                            }
                                        </div>

                                    </div>


                                    {/* Mercado Pago */}

                                    <div className="balance-resumen-item">

                                        <div className="balance-item-titulo">
                                            <span>📱</span>
                                            <span>MERCADO PAGO</span>
                                        </div>

                                        <div className="balance-item-monto">
                                            $
                                            {
                                                totalMercadoPago.toLocaleString()
                                            }
                                        </div>

                                    </div>


                                    {/* Total */}

                                    <div className="balance-total">

                                        <div className="balance-total-titulo">
                                            💰 TOTAL
                                        </div>

                                        <div className="balance-total-monto">
                                            $
                                            {
                                                total.toLocaleString()
                                            }
                                        </div>

                                        <div className="balance-total-subtitulo">

                                            {
                                                pagos.length
                                            }

                                            {" "}

                                            {
                                                pagos.length === 1
                                                    ? "pago encontrado"
                                                    : "pagos encontrados"
                                            }

                                        </div>

                                    </div>

                                </div>

                                :

                                <div className="balance-total balance-total-unico">

                                    <div className="balance-total-titulo">
                                        💰 TOTAL {metodo.toUpperCase()}
                                    </div>

                                    <div className="balance-total-monto">
                                        $
                                        {
                                            total.toLocaleString()
                                        }
                                    </div>

                                    <div className="balance-total-subtitulo">

                                        {
                                            pagos.length
                                        }

                                        {" "}

                                        {
                                            pagos.length === 1
                                                ? "pago encontrado"
                                                : "pagos encontrados"
                                        }

                                    </div>

                                </div>

                        }

                    </div>

                </div>

            </div>


            {/* =========================
                DETALLE
            ========================= */}

            <div className="lista-casa balance-detalle">

                <div className="lista-casa-header">

                    <h2>
                        💳 Pagos Encontrados
                    </h2>

                </div>


                <div className="tabla-balance">

                    {/* Encabezados */}

                    <div className="fila-balance fila-balance-header">

                        <div>
                            ALUMNO
                        </div>

                        <div>
                            CONCEPTO
                        </div>

                        <div>
                            FECHA
                        </div>

                        <div>
                            MÉTODO
                        </div>

                        <div>
                            MONTO
                        </div>

                    </div>


                    {/* Pagos */}

                    {
                        pagos.map(
                            (p: any) =>

                                <div
                                    key={p.id}
                                    className="fila-balance"
                                >

                                    {/* Alumno */}

                                    <div>

                                        <div className="nombre-alumno">

                                            {
                                                p.alumno?.apellido
                                            }

                                            {" "}

                                            {
                                                p.alumno?.nombre
                                            }

                                        </div>

                                    </div>


                                    {/* Concepto */}

                                    <div>

                                        <small>

                                            {
                                                p.concepto || "—"
                                            }

                                        </small>

                                    </div>


                                    {/* Fecha */}

                                    <div>

                                        <small>

                                            📅{" "}

                                            {
                                                formatearFecha(
                                                    p.fechaPago
                                                )
                                            }

                                        </small>

                                    </div>


                                    {/* Método */}

                                    <div>

                                        <small>

                                            {
                                                p.metodoPago || "—"
                                            }

                                        </small>

                                    </div>


                                    {/* Monto */}

                                    <div className="balance-monto">

                                        <strong>

                                            $
                                            {
                                                Number(
                                                    p.monto
                                                ).toLocaleString()
                                            }

                                        </strong>

                                    </div>

                                </div>
                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default Balance;