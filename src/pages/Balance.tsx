import { useState } from "react";
import { obtenerBalance } from "../services/balanceService";

/** * Pantalla de balance financiero. 
 * * Permite consultar la recaudación dentro de un rango de fechas determinado y filtrar por método de pago. */
function Balance(){

    // Filtros de búsqueda
    const[ desde, setDesde ]=useState("");
    const[ hasta, setHasta ]=useState("");
    const[ metodo,setMetodo ]=useState("TODOS");

    // Resultado obtenido desde el backend
    const[ pagos,setPagos ]=useState([]);

    /** * Consulta los pagos según los filtros seleccionados. */
    const buscar= async()=>{
        const data= await obtenerBalance(
            desde,
            hasta,
            metodo
        );
        setPagos(data);
    };

    /** * Total general de pagos encontrados. */
    const total=
        pagos.reduce(
            (
                acum:any,
                p:any
            )=>
                acum + Number( p.monto ),0
        );

    const totalEfectivo =
        pagos
            .filter(
                (p:any)=>
                p.metodoPago ===
                "Efectivo"
            )
            .reduce(
                (
                    acum:any,
                    p:any
                )=>
                acum +
                Number(
                    p.monto
                ),
                0
             );

    const totalTransferencia =
        pagos
        .filter(
            (p:any)=>
            p.metodoPago ===
            "Transferencia"
        )
        .reduce(
            (
                acum:any,
                p:any
            )=>
            acum + Number( p.monto ), 0
        );

    const totalMercadoPago =
        pagos
            .filter(
                (p:any)=>
                p.metodoPago ===
                "Mercado Pago"
            )
            .reduce(
                (
                    acum:any,
                    p:any
                )=>
                acum + Number( p.monto ), 0
            );
    
    // Renderizado de la pantalla de balance
    return(
        <div className="container mt-4">

            <h1 className="titulo-principal">
                Balance
            </h1>

            {/* Filtros de búsqueda */}
            <div className="card-casa">
                <div className="card-casa-body">

                    {/* Fecha desde */}
                    <input type="date" className="form-control campo-casa mb-2" value={desde}
                        onChange={
                            e=>
                            setDesde(
                                e.target.value
                            )
                        }
                    />

                    {/* Fecha hasta */}
                    <input type="date" className="form-control campo-casa mb-2" value={hasta}
                        onChange={
                            e=>
                            setHasta(
                                e.target.value
                            )
                        }
                    />

                    {/* Método de pago */}
                    <select className="form-control campo-casa mb-3" value={metodo}
                        onChange={
                            e=>
                            setMetodo(
                                e.target.value
                            )
                        }
                    >

                        <option>
                            TODOS
                        </option>

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

                    <button className="btn-casa" onClick={ buscar }>
                        Buscar
                    </button>
                </div>

            </div>

            {/* Resumen financiero */}
            <div className="card-casa mt-4">
                <div className="card-casa-body">
                    {
                        metodo === "TODOS"
                        ?
                        <>
                            <h3>
                                Resumen de Recaudación
                            </h3>

                            <div className="balance-item">
                                💵 Efectivo
                                <strong>
                                    $
                                    {
                                        totalEfectivo.toLocaleString()
                                    }
                                </strong>
                            </div>

                            <div className="balance-item">
                                🏦 Transferencia
                                <strong>
                                    $
                                    {
                                        totalTransferencia.toLocaleString()
                                    }
                                </strong>
                            </div>

                            <div className="balance-item">
                                📱 Mercado Pago
                                <strong>
                                    $
                                    {
                                        totalMercadoPago.toLocaleString()
                                    }
                                </strong>
                            </div>
                            <hr />
                            <h2>
                                💰 Total
                                $
                                {
                                    total.toLocaleString()
                                }
                            </h2>
                        </>
                        :
                        <>
                            <h3>
                                Total {
                                    metodo
                                }
                            </h3>
                            <h2>
                                $
                                {
                                    total.toLocaleString()
                                }
                            </h2>
                        </>
                    }
                    <p>
                        Cantidad de pagos:
                        {" "}
                        {
                            pagos.length
                        }
                    </p>
                </div>
            </div>

            {/* Detalle de pagos encontrados */}
            <div className="lista-casa mt-4" >
                <div className="lista-casa-header">
                    <h2>
                        Pagos Encontrados
                    </h2>
                </div>
                {
                    pagos.map( (p:any)=>
                        <div key={p.id} className="fila-alumno">
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

                                <small>
                                    {
                                        p.concepto
                                    }
                                </small>
                            </div>

                            <div>
                                $
                                {
                                    Number(
                                        p.monto
                                    ).toLocaleString()
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Balance;