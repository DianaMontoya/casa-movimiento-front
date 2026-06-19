import { useEffect, useState } from "react";

/**
 * Props del modal de edición de pagos.
 * Recibe el pago seleccionado y las acciones
 * para guardar o cancelar la edición.
 */
type Props = {
    pago:any;
    onCerrar:()=>void;
    onGuardar:(pago:any)=>void;
};

/**
 * Modal utilizado para editar los datos
 * de un pago previamente registrado.
 */
function ModalPago({
    pago,
    onCerrar,
    onGuardar
}:Props){

    // Estados locales utilizados para editar el pago
    const [concepto,setConcepto]= useState('');
    const [monto,setMonto]= useState('');
    const [metodoPago,setMetodoPago]= useState('');
    const [fechaPago,setFechaPago]= useState('');
    const [observaciones,setObservaciones]= useState('');

    /**
     * Sincroniza los datos del formulario cada vez
     * que cambia el pago seleccionado.
     */
    useEffect(()=>{

        if(!pago)
            return;

        setConcepto(
            pago.concepto || ''
        );

        setMonto(
            pago.monto || ''
        );

        setMetodoPago(
            pago.metodoPago || ''
        );

        setFechaPago(
            pago.fechaPago || ''
        );

        setObservaciones(
            pago.observaciones || ''
        );

    },[pago]);

    /**
     * Construye el objeto actualizado y lo envía
     * al componente padre para persistir los cambios.
     */
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

    // Si no existe un pago seleccionado no se muestra el modal
    if(!pago)
        return null;

    // Renderizado del modal de edición
    return(

        <div className="modal-overlay">

            <div className="modal-casa">

                {/* Título del formulario */}
                <h2>

                    Editar Pago

                </h2>

                {/* Concepto del pago */}
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

                {/* Monto abonado */}
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

                {/* Método de pago utilizado */}
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

                {/* Fecha del pago */}
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

                {/* Observaciones adicionales */}
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

                {/* Acciones disponibles */}
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