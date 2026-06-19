import { useEffect, useState } from "react";
import {
    obtenerMovimientos,
    guardarMovimiento
} from "../services/movimientoService";

/** * Pantalla de gestión de movimientos financieros. * * Permite registrar ingresos y egresos, * visualizar el historial de movimientos * y consultar el resumen financiero del día. */
function Movimientos(){
    const[ movimientos, setMovimientos ] = useState([]);
    const[ tipo, setTipo ] = useState("INGRESO");
    const[ concepto, setConcepto ] = useState("");
    const[ monto, setMonto ] = useState("");
    const[ fecha, setFecha ] = useState("");
    const[ observaciones, setObservaciones ]=useState("");

    useEffect(()=>{
        cargar();
    },[]);

    const cargar=
        async()=>{
            const data = await obtenerMovimientos();
            setMovimientos(data);
        };

   const guardar = async()=>{
        await guardarMovimiento({
            tipo,
            concepto,
            monto,
            fecha,
            observaciones
        });
        setTipo("INGRESO");
        setConcepto("");
        setMonto("");
        setFecha("");
        setObservaciones("");
        await cargar();
    };

    const hoy = new Date()
        .toISOString()
        .split("T")[0];

    const ingresosHoy = movimientos
        .filter(
            (m:any)=>
                m.fecha === hoy && m.tipo === "INGRESO"
        )
        .reduce(
            (
                acum:number,
                m:any
            )=>
                acum + Number( m.monto ), 0
        );
    
    const egresosHoy = movimientos
        .filter(
            (m:any)=>
                m.fecha === hoy && m.tipo === "EGRESO"
        )
        .reduce(
            (
                acum:number,
                m:any
            )=>
                acum + Number( m.monto ), 0
        );

    const resultadoHoy = ingresosHoy - egresosHoy;

    return(
        <div className="container mt-4">
            <h1 className="titulo-principal">
                Ingresos y Egresos
            </h1>

            <div className="row">
                <div className="col-12 col-lg-4">
                    <div className="card-casa">
                        <div className="card-casa-body">
                            <select className="form-control campo-casa" value={tipo}
                                onChange={
                                    e=>
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

                            <input className="form-control campo-casa mt-2" placeholder="Concepto" value={concepto}
                                onChange={
                                    e=>
                                    setConcepto(
                                        e.target.value
                                    )
                                }
                            />

                            <input className="form-control campo-casa mt-2" placeholder="Monto" value={monto}
                                onChange={
                                    e=>
                                    setMonto(
                                        e.target.value
                                    )
                                }
                            />

                            <input type="date" className="form-control campo-casa mt-2" value={fecha}
                                onChange={
                                    e=>
                                    setFecha(
                                        e.target.value
                                    )
                                }
                            />

                            <textarea className="form-control campo-casa mt-2" placeholder="Observaciones" value={observaciones}
                                onChange={
                                    e=>
                                    setObservaciones(
                                        e.target.value
                                    )
                                }
                            />

                            <button className="btn-casa mt-3" onClick={guardar}>
                                Guardar Movimiento
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-8">
                    <div className="lista-casa">
                        <div className="resumen-financiero">
                            <div className="card-balance">
                                <h3>
                                    💰 Ingresos de Hoy
                                </h3>

                                <div className="monto-balance">
                                    $
                                    {
                                        ingresosHoy.toLocaleString()
                                    }
                                </div>
                            </div>

                            <div className="card-balance">
                                <h3>
                                    💸 Egresos de Hoy
                                </h3>

                                <div className="monto-balance">
                                    $
                                    {
                                        egresosHoy.toLocaleString()
                                    }
                                </div>
                            </div>

                            <div className="card-balance">
                                <h3>
                                    📈 Resultado
                                </h3>

                                <div
                                    className={
                                        resultadoHoy >= 0
                                        ?
                                        "monto-balance"
                                        :
                                        "monto-balance-negativo"
                                    }
                                >
                                    $
                                    {
                                        resultadoHoy.toLocaleString()
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="lista-casa-header">
                            <h2>
                                Movimientos Registrados
                            </h2>
                        </div>

                        {
                            movimientos
                                .sort(
                                    (
                                        a:any,
                                        b:any
                                    )=>
                                    new Date( b.fecha ).getTime() - new Date( a.fecha ).getTime()
                                )

                                .map(
                                    (m:any)=>

                                    <div key={m.id} className="fila-alumno">
                                        <div>
                                            <div className="nombre-alumno">
                                                {
                                                    m.concepto
                                                }
                                            </div>

                                            <small>
                                                {
                                                    new Date(
                                                        m.fecha
                                                    )
                                                    .toLocaleDateString(
                                                        "es-AR"
                                                    )
                                                }
                                            </small>
                                        </div>

                                        <div>
                                            <span
                                                className={
                                                    m.tipo === "INGRESO"
                                                ?
                                                "estado-ingreso"
                                                :
                                                "estado-egreso"
                                                }
                                            >
                                                {
                                                    m.tipo
                                                }
                                            </span>
                                        </div>

                                        <div>
                                            $
                                            {
                                                Number(
                                                    m.monto
                                                )
                                                .toLocaleString()
                                            }
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movimientos;