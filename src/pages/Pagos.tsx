import { useEffect, useState } from "react";

import { obtenerAlumnos } from "../services/alumnoService";

import {obtenerPagos,guardarPago,actualizarPago} from "../services/pagoService";

import PagoModal from "../components/PagoModal";


function Pagos() {

    const [alumnos, setAlumnos] = useState([]);

    const [alumnoId, setAlumnoId] = useState("");

    const [concepto, setConcepto] = useState("");

    const [monto, setMonto] = useState("");

    const [metodoPago, setMetodoPago] = useState("");

    const [fechaPago, setFechaPago] = useState("");

    const [observaciones, setObservaciones] = useState("");

    const [pagos, setPagos] = useState([]);

    const [busquedaAlumno, setBusquedaAlumno]= useState("");

    const totalPorDia = pagos.reduce(

        (acum:number, p:any) => {

            const hoy =
                new Date()
                .toISOString()
                .split("T")[0];

            if (p.fechaPago === hoy) {

                return acum + Number(p.monto);

            }

            return acum;

        },

        0

    );

    const cantidadPagosHoy = pagos.filter(

        (p:any) => {

            const hoy =
                new Date()
                .toISOString()
                .split("T")[0];

            return p.fechaPago === hoy;

        }

    ).length;

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
    
    const alumnosFiltrados =
        alumnos.filter(
            (a:any)=>
                `${a.apellido} ${a.nombre}`
                    .toLowerCase()
                    .includes(
                        busquedaAlumno
                        .toLowerCase()
                    )
    );

    useEffect(() => {

        cargarAlumnos();

        cargarPagos();

    }, []);

    const cargarAlumnos = async () => {

        const data =
            await obtenerAlumnos();

        setAlumnos(data);

    };

    const cargarPagos = async () => {

        const data =
            await obtenerPagos();

        setPagos(data);

    };


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

    };

    const formatearFecha =
    (fecha:string)=>{

        if(!fecha)
            return "";

        const partes =
            fecha.split("-");

        return `${partes[2]}-${partes[1]}-${partes[0]}`;

    };

    const [mostrarModalPago,
    setMostrarModalPago]
    = useState(false);

    const [pagoSeleccionado,
    setPagoSeleccionado]
    = useState<any>(null);

    const abrirModalPago =
    (pago:any)=>{

        setPagoSeleccionado(pago);

        setMostrarModalPago(true);

    };

    const guardarEdicionPago =
async (
    pago:any
)=>{

    await actualizarPago(

        pago.id,

        pago

    );

    await cargarPagos();

    setMostrarModalPago(
        false
    );

};


 return (

    <div className="container mt-4">

        <h1 className="titulo-principal">

            PAGOS

        </h1>

        <div className="row">

            {/* COLUMNA IZQUIERDA */}

            <div className="col-12 col-lg-4">

                <div className="card-casa">

                    <div className="card-casa-header">

                        <h2>

                            Registrar Pago

                        </h2>

                    </div>

                    <div className="card-casa-body">

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

                                busquedaAlumno.length > 0 &&

                                <div className="lista-desplegable">

                                    {

                                        alumnosFiltrados
                                            .slice(0,10)
                                            .map(
                                                (a:any)=>

                                                <div
                                                    key={a.id}
                                                    className="item-desplegable"
                                                    onClick={() => {

                                                        setAlumnoId(a.id);

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

                            <option>Efectivo</option>

                            <option>Transferencia</option>

                            <option>Mercado Pago</option>

                        </select>

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

                        <button
                            className="btn-casa mt-3 w-100"
                            onClick={guardar}
                        >

                            Guardar Pago

                        </button>

                    </div>

                </div>

            </div>

            {/* COLUMNA DERECHA */}


            <div className="col-12 col-lg-8">


                 <div className="resumen-financiero">

                    <div className="card-balance">

                        <h3>
                            Recaudación de Hoy
                        </h3>

                        <div className="monto-balance">
                            $
                            {totalPorDia.toLocaleString()}
                        </div>

                        <small>
                            {cantidadPagosHoy}
                            {" "}
                            pagos registrados
                        </small>

                    </div>

                </div>


                <div className="lista-casa">

                    <div className="lista-casa-header">

                        <h2>

                            Pagos Registrados

                        </h2>

                    </div>

                    {

                        pagos
                        
                         .sort(

                            (a:any,b:any)=>

                                new Date(b.fechaPago).getTime()

                                -

                                new Date(a.fechaPago).getTime()

                        )
                        
                        .map(

                            (p:any)=>

                            <div
                                className="fila-alumno"
                                key={p.id}
                            >

                            <div className="info-pago">

                         
                                    <div className="nombre-alumno">

                                        {p.alumno?.apellido}
                                        {" "}
                                        {p.alumno?.nombre}

                                    </div>

                                    <small>

                                        {p.concepto}

                                    </small>

                                    <br />

                                    <small className="texto-secundario">

                                        📅 {formatearFecha(p.fechaPago)}

                                    </small>

                                
                            </div>
                            <div className="acciones-pago">

                                <strong>

                                    ${p.monto}

                                </strong>

                                <button
                                    className="btn-editar"
                                    onClick={
                                        ()=>abrirModalPago(p)
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

        {
            mostrarModalPago 
            &&
            pagoSeleccionado
            &&
            <PagoModal

                pago={pagoSeleccionado}

                onCerrar={
                    ()=>setMostrarModalPago(false)
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