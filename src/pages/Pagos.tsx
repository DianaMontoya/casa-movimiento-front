import { useEffect, useState } from "react";
import { obtenerAlumnos } from "../services/alumnoService";
import {
    obtenerPagos,
    guardarPago,
    actualizarPago
} from "../services/pagoService";
import PagoModal from "../components/PagoModal";

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD.
 *
 * Es el formato requerido por los inputs de tipo date.
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
 * Pantalla principal de gestión de pagos.
 *
 * Funcionalidades:
 * - Registrar pagos de alumnos.
 * - Asociar cuotas mensuales.
 * - Buscar alumnos mediante autocompletado.
 * - Visualizar pagos registrados.
 * - Editar pagos existentes.
 * - Consultar la recaudación diaria.
 */
function Pagos() {

    // =========================
    // DATOS GENERALES
    // =========================

    const [alumnos, setAlumnos] =
        useState<any[]>([]);

    const [pagos, setPagos] =
        useState<any[]>([]);


    // =========================
    // FORMULARIO
    // =========================

    const [alumnoId, setAlumnoId] =
        useState("");

    const [concepto, setConcepto] =
        useState("");

    const [monto, setMonto] =
        useState("");

    const [metodoPago, setMetodoPago] =
        useState("");

    // Fecha actual por defecto
    const [fechaPago, setFechaPago] =
        useState(obtenerFechaActual());

    const [observaciones, setObservaciones] =
        useState("");


    // =========================
    // BUSCADOR
    // =========================

    const [busquedaAlumno, setBusquedaAlumno] =
        useState("");


    /** Calcula la recaudación total del día actual. */
    const totalPorDia = pagos.reduce(
        (
            acum: number,
            p: any
        ) => {

            const hoy =
                obtenerFechaActual();

            if (p.fechaPago === hoy) {

                return acum + Number(p.monto);

            }

            return acum;

        },
        0
    );


    /** Cantidad de pagos registrados hoy. */
    const cantidadPagosHoy =
        pagos.filter(
            (p: any) => {

                const hoy =
                    obtenerFechaActual();

                return p.fechaPago === hoy;

            }
        ).length;


    /** Cuotas disponibles para asignar a los pagos. */
    const conceptosCuota = [

        "MARZO 2026",
        "ABRIL 2026",
        "MAYO 2026",
        "JUNIO 2026",
        "JULIO 2026",
        "AGOSTO 2026",
        "SEPTIEMBRE 2026",
        "OCTUBRE 2026",
        "NOVIEMBRE 2026",
        "DICIEMBRE 2026"

    ];


    /** Filtra alumnos según el texto ingresado. */
    const alumnosFiltrados =
        alumnos.filter(
            (a: any) =>
                `${a.apellido} ${a.nombre}`
                    .toLowerCase()
                    .includes(
                        busquedaAlumno.toLowerCase()
                    )
        );


    // =========================
    // CARGA INICIAL
    // =========================

    useEffect(() => {

        cargarAlumnos();
        cargarPagos();

    }, []);


    /** Obtiene todos los alumnos registrados. */
    const cargarAlumnos = async () => {

        const data =
            await obtenerAlumnos();

        setAlumnos(data);

    };


    /** Obtiene todos los pagos registrados. */
    const cargarPagos = async () => {

        const data =
            await obtenerPagos();

        setPagos(data);

    };


    // =========================
    // GUARDAR PAGO
    // =========================

    const guardar = async () => {

        await guardarPago({

            alumno: {
                id: alumnoId
            },

            concepto,
            monto,
            metodoPago,
            fechaPago,
            observaciones

        });


        await cargarPagos();


        // =========================
        // LIMPIAR FORMULARIO
        // =========================

        setAlumnoId("");
        setConcepto("");
        setMonto("");
        setMetodoPago("");
        setFechaPago(obtenerFechaActual());
        setObservaciones("");
        setBusquedaAlumno("");

    };


    /** Convierte YYYY-MM-DD a DD-MM-YYYY. */
    const formatearFecha = (fecha: string) => {

        if (!fecha) {
            return "";
        }

        const partes =
            fecha.split("-");

        return `${partes[2]}-${partes[1]}-${partes[0]}`;

    };


    // =========================
    // EDICIÓN DE PAGOS
    // =========================

    const [mostrarModalPago, setMostrarModalPago] =
        useState(false);

    const [pagoSeleccionado, setPagoSeleccionado] =
        useState<any>(null);


    /** Abre el modal cargando el pago seleccionado. */
    const abrirModalPago = (pago: any) => {

        setPagoSeleccionado(pago);

        setMostrarModalPago(true);

    };


    /** Guarda los cambios realizados sobre un pago. */
    const guardarEdicionPago = async (pago: any) => {

        await actualizarPago(
            pago.id,
            pago
        );

        await cargarPagos();

        setMostrarModalPago(false);

    };


    // =========================
    // RENDERIZADO
    // =========================

    return (

        <div className="container mt-4">

            <h1 className="titulo-principal">
                PAGOS
            </h1>


            <div className="row">

                {/* =========================
                    COLUMNA IZQUIERDA
                ========================= */}

                <div className="col-12 col-lg-4">

                    <div className="card-casa">

                        <div className="card-casa-header">

                            <h2>
                                Registrar Pago
                            </h2>

                        </div>


                        <div className="card-casa-body">

                            {/* =========================
                                BUSCAR ALUMNO
                            ========================= */}

                            <div className="buscador-alumno">

                                <input
                                    className="form-control campo-casa"
                                    placeholder="Buscar alumno..."
                                    value={busquedaAlumno}
                                    onChange={
                                        e =>
                                            setBusquedaAlumno(
                                                e.target.value
                                            )
                                    }
                                />


                                {
                                    busquedaAlumno.length > 0
                                    &&
                                    <div className="lista-desplegable">

                                        {
                                            alumnosFiltrados
                                                .slice(0, 10)
                                                .map(
                                                    (a: any) =>

                                                        <div
                                                            key={a.id}
                                                            className="item-desplegable"

                                                            onClick={() => {

                                                                setAlumnoId(
                                                                    a.id
                                                                );

                                                                setBusquedaAlumno(
                                                                    `${a.apellido}, ${a.nombre}`
                                                                );

                                                            }}
                                                        >

                                                            {a.apellido},
                                                            {" "}
                                                            {a.nombre}

                                                        </div>

                                                )
                                        }

                                    </div>
                                }

                            </div>


                            {/* =========================
                                CUOTA
                            ========================= */}

                            <select
                                className="form-control campo-casa mt-2"
                                value={concepto}
                                onChange={
                                    e =>
                                        setConcepto(
                                            e.target.value
                                        )
                                }
                            >

                                <option value="">
                                    Seleccionar Cuota
                                </option>

                                {
                                    conceptosCuota.map(
                                        c =>

                                            <option
                                                key={c}
                                                value={c}
                                            >
                                                {c}
                                            </option>

                                    )
                                }

                            </select>


                            {/* =========================
                                MONTO
                            ========================= */}

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


                            {/* =========================
                                MÉTODO
                            ========================= */}

                            <select
                                className="form-control campo-casa mt-2"
                                value={metodoPago}
                                onChange={
                                    e =>
                                        setMetodoPago(
                                            e.target.value
                                        )
                                }
                            >

                                <option>
                                    Efectivo
                                </option>

                                <option>
                                    Transferencia
                                </option>

                                <option>
                                    Mercado Pago
                                </option>

                            </select>


                            {/* =========================
                                FECHA
                            ========================= */}

                            <input
                                type="date"
                                className="form-control campo-casa mt-2"
                                value={fechaPago}
                                onChange={
                                    e =>
                                        setFechaPago(
                                            e.target.value
                                        )
                                }
                            />


                            {/* =========================
                                OBSERVACIONES
                            ========================= */}

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


                            {/* =========================
                                GUARDAR
                            ========================= */}

                            <button
                                className="btn-casa mt-3 w-100"
                                onClick={guardar}
                            >
                                Guardar Pago
                            </button>

                        </div>

                    </div>

                </div>


                {/* =========================
                    COLUMNA DERECHA
                ========================= */}

                <div className="col-12 col-lg-8">

                    {/* =========================
                        RECAUDACIÓN DEL DÍA
                    ========================= */}

                    <div className="resumen-financiero">

                        <div className="card-balance">

                            <span>
                                Recaudación de Hoy
                            </span>

                            <div className="monto-balance">

                                <h3>
                                    $
                                    {
                                        totalPorDia.toLocaleString()
                                    }
                                </h3>

                            </div>

                            <small>

                                {
                                    cantidadPagosHoy
                                }

                                {" "}

                                pagos registrados

                            </small>

                        </div>

                    </div>


                    {/* =========================
                        PAGOS REGISTRADOS
                    ========================= */}

                    <div className="lista-casa">

                        <div className="lista-casa-header">

                            <h2>
                                Pagos Registrados
                            </h2>

                        </div>


                        <div className="tabla-pagos">

                            {/* Encabezados */}

                            <div className="fila-pago fila-pago-header">

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
                                    MONTO
                                </div>

                                <div>
                                    ACCIÓN
                                </div>

                            </div>


                            {/* Pagos */}

                            {
                                [...pagos]
                                    .sort(
                                        (
                                            a: any,
                                            b: any
                                        ) =>
                                            new Date(
                                                b.fechaPago
                                            ).getTime()
                                            -
                                            new Date(
                                                a.fechaPago
                                            ).getTime()
                                    )
                                    .map(
                                        (p: any) =>

                                            <div
                                                className="fila-pago"
                                                key={p.id}
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
                                                            p.concepto
                                                            ||
                                                            "—"
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


                                                {/* Monto */}

                                                <div className="monto-pago-lista">

                                                    <strong>
                                                        ${p.monto}
                                                    </strong>

                                                </div>


                                                {/* Acción */}

                                                <div>

                                                    <button
                                                        className="btn-editar"
                                                        onClick={() =>
                                                            abrirModalPago(
                                                                p
                                                            )
                                                        }
                                                    >
                                                        Editar
                                                    </button>

                                                </div>

                                            </div>

                                    )
                            }

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                MODAL DE EDICIÓN
            ========================= */}

            {
                mostrarModalPago
                &&
                pagoSeleccionado
                &&
                <PagoModal
                    pago={pagoSeleccionado}

                    onCerrar={
                        () =>
                            setMostrarModalPago(
                                false
                            )
                    }

                    onGuardar={
                        guardarEdicionPago
                    }
                />
            }

        </div>

    );

}

export default Pagos;