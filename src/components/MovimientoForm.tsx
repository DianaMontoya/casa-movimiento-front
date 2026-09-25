import { useState } from "react";

/**
 * Props del formulario de movimientos.
 */
type Props = {
    onGuardar: (movimiento: any) => void | Promise<void>;
};


/**
 * Obtiene la fecha actual en formato YYYY-MM-DD.
 *
 * Es el formato requerido por input type="date".
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
 * Formulario para registrar ingresos y egresos.
 */
function MovimientoForm({
    onGuardar
}: Props) {

    const [tipo, setTipo] =
        useState("INGRESO");

    const [concepto, setConcepto] =
        useState("");

    const [monto, setMonto] =
        useState("");

    const [fecha, setFecha] =
        useState(obtenerFechaActual());

    const [observaciones, setObservaciones] =
        useState("");


    /**
     * Guarda el movimiento y limpia el formulario.
     */
    const guardar = async () => {

        await onGuardar({

            tipo,
            concepto,
            monto,
            fecha,
            observaciones

        });


        // Limpiar formulario

        setTipo("INGRESO");
        setConcepto("");
        setMonto("");
        setFecha(obtenerFechaActual());
        setObservaciones("");

    };


    return (

        <div className="card-casa">

            <div className="card-casa-header">

                <h2 className="m-0">
                    Nuevo Movimiento
                </h2>

            </div>


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

    );

}

export default MovimientoForm;