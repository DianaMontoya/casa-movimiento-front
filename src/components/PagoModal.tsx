import { useState } from "react";

type Props = {

    pago:any;

    onCerrar:()=>void;

    onGuardar:(pago:any)=>void;

};

function ModalPago({

    pago,

    onCerrar,

    onGuardar

}:Props){

    const [concepto,setConcepto]
    = useState(pago.concepto);

    const [monto,setMonto]
    = useState(pago.monto);

    const [metodoPago,setMetodoPago]
    = useState(pago.metodoPago);

    const [fechaPago,setFechaPago]
    = useState(pago.fechaPago);

    const [observaciones,setObservaciones]
    = useState(pago.observaciones);

    const guardar=()=>{

        onGuardar({

            ...pago,

            concepto,

            monto,

            metodoPago,

            fechaPago,

            observaciones

        });

    };

    return(

        <div className="modal-overlay">

            <div className="modal-casa">

                <h2>

                    Editar Pago

                </h2>

                <input
                    className="form-control campo-casa mt-2"
                    value={concepto}
                    onChange={
                        e=>
                        setConcepto(
                            e.target.value
                        )
                    }
                />

                <input
                    className="form-control campo-casa mt-2"
                    value={monto}
                    onChange={
                        e=>
                        setMonto(
                            e.target.value
                        )
                    }
                />

                <select
                    className="form-control campo-casa mt-2"
                    value={metodoPago}
                    onChange={
                        e=>
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

                <input
                    type="date"
                    className="form-control campo-casa mt-2"
                    value={fechaPago}
                    onChange={
                        e=>
                        setFechaPago(
                            e.target.value
                        )
                    }
                />

                <textarea
                    className="form-control campo-casa mt-2"
                    value={observaciones}
                    onChange={
                        e=>
                        setObservaciones(
                            e.target.value
                        )
                    }
                />

                <div className="mt-3 d-flex gap-2">

                    <button
                        className="btn-casa"
                        onClick={guardar}
                    >

                        Guardar

                    </button>

                    <button
                        className="btn-editar"
                        onClick={onCerrar}
                    >

                        Cancelar

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ModalPago;