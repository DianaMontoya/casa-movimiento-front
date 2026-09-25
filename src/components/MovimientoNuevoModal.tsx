import { useState } from "react";

type Props = {
    onCerrar: () => void;
    onGuardar: (movimiento: any) => Promise<void>;
};


/**
 * Obtiene la fecha actual en formato YYYY-MM-DD.
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
 * Modal para registrar un nuevo movimiento.
 *
 * Mantiene exactamente la misma distribución visual
 * que MovimientoModal.
 */
function MovimientoNuevoModal({
    onCerrar,
    onGuardar
}: Props) {

    // =========================
    // ESTADOS
    // =========================

    const [tipo, setTipo] = useState("INGRESO");

    const [concepto, setConcepto] =
        useState("");

    const [monto, setMonto] =
        useState("");

    const [fecha, setFecha] =
        useState(obtenerFechaActual());

    const [observaciones, setObservaciones] =
        useState("");


    // =========================
    // GUARDAR
    // =========================

    const guardar = async () => {

        await onGuardar({

            tipo,
            concepto,
            monto,
            fecha,
            observaciones

        });

        onCerrar();

    };


    // =========================
    // RENDER
    // =========================

    return (

        <div className="modal-overlay">

            <div className="modal-casa movimiento-modal">

                {/* =========================
                    ENCABEZADO
                ========================= */}

                <div className="modal-alumno-header">

                    <div>

                        <h2>
                            Nuevo Movimiento
                        </h2>

                        <small>
                            Registrar un nuevo movimiento
                        </small>

                    </div>


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
                            onChange={e =>
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
                            onChange={e =>
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
                            placeholder="Concepto"
                            onChange={e =>
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
                            type="number"
                            className="form-control campo-casa"
                            value={monto}
                            placeholder="Monto"
                            min="0"
                            step="0.01"
                            onChange={e =>
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
                            placeholder="Observaciones"
                            onChange={e =>
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
                        onClick={guardar}
                        type="button"
                    >
                        Guardar Movimiento
                    </button>

                    <button
                        className="btn-editar"
                        onClick={onCerrar}
                        type="button"
                    >
                        Cancelar
                    </button>

                </div>

            </div>

        </div>

    );

}

export default MovimientoNuevoModal;

