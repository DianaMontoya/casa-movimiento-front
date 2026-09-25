import { useEffect, useState } from "react";

type Props = {
    movimiento: any;
    onCerrar: () => void;
    onGuardar: (movimiento: any) => void | Promise<void>;
};


/**
 * Modal de edición de movimientos.
 */
function MovimientoModal({
    movimiento,
    onCerrar,
    onGuardar
}: Props) {

    const [tipo, setTipo] = useState("INGRESO");
    const [concepto, setConcepto] = useState("");
    const [monto, setMonto] = useState("");
    const [fecha, setFecha] = useState("");
    const [observaciones, setObservaciones] =
        useState("");


    /**
     * Carga los datos del movimiento seleccionado.
     */
    useEffect(() => {

        if (!movimiento) {
            return;
        }

        setTipo(
            movimiento.tipo || "INGRESO"
        );

        setConcepto(
            movimiento.concepto || ""
        );

        setMonto(
            movimiento.monto ?? ""
        );

        setFecha(
            movimiento.fecha || ""
        );

        setObservaciones(
            movimiento.observaciones || ""
        );

    }, [movimiento]);


    /**
     * Guarda los cambios.
     */
    const guardarCambios = async () => {

        await onGuardar({

            ...movimiento,

            tipo,
            concepto,
            monto,
            fecha,
            observaciones

        });

    };


    if (!movimiento) {
        return null;
    }


    return (

        <div className="modal-overlay">

            <div className="modal-casa movimiento-modal">

                {/* =========================
                    ENCABEZADO
                ========================= */}

                <div className="modal-alumno-header">

                    <div>

                        <h2>
                            Editar Movimiento
                        </h2>

                        <small>
                            Modificar información
                        </small>

                    </div>


                    <button
                        type="button"
                        className="modal-cerrar"
                        onClick={onCerrar}
                        title="Cerrar"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>

                </div>


                <hr />


                {/* =========================
                    FORMULARIO
                ========================= */}

                <div className="movimiento-detalle-grid">

                    {/* Tipo */}

                    <div className="movimiento-detalle-item">

                        <label>
                            Tipo
                        </label>

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

                    </div>


                    {/* Fecha */}

                    <div className="movimiento-detalle-item">

                        <label>
                            Fecha
                        </label>

                        <input
                            type="date"
                            className="form-control campo-casa"
                            value={fecha}
                            onChange={
                                e =>
                                    setFecha(
                                        e.target.value
                                    )
                            }
                        />

                    </div>


                    {/* Concepto */}

                    <div className="movimiento-detalle-item movimiento-detalle-full">

                        <label>
                            Concepto
                        </label>

                        <input
                            className="form-control campo-casa"
                            value={concepto}
                            onChange={
                                e =>
                                    setConcepto(
                                        e.target.value
                                    )
                            }
                        />

                    </div>


                    {/* Monto */}

                    <div className="movimiento-detalle-item movimiento-detalle-full">

                        <label>
                            Monto
                        </label>

                        <input
                            className="form-control campo-casa"
                            value={monto}
                            onChange={
                                e =>
                                    setMonto(
                                        e.target.value
                                    )
                            }
                        />

                    </div>


                    {/* Observaciones */}

                    <div className="movimiento-detalle-item movimiento-detalle-full">

                        <label>
                            Observaciones
                        </label>

                        <textarea
                            className="form-control campo-casa"
                            rows={3}
                            value={observaciones}
                            onChange={
                                e =>
                                    setObservaciones(
                                        e.target.value
                                    )
                            }
                        />

                    </div>

                </div>


                {/* =========================
                    BOTONES
                ========================= */}

                <div className="mt-3 d-flex gap-2">

                    <button
                        className="btn-casa"
                        onClick={guardarCambios}
                    >
                        Guardar Cambios
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

export default MovimientoModal;