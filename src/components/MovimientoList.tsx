type Props = {
    movimientos: any[];
    onSeleccionar: (movimiento: any) => void;
};


/**
 * Listado de movimientos financieros.
 *
 * Mantiene las columnas alineadas mediante CSS Grid.
 */
function MovimientoList({
    movimientos,
    onSeleccionar
}: Props) {


    /**
     * Convierte YYYY-MM-DD a DD-MM-YYYY.
     */
    const formatearFecha = (fecha: string) => {

        if (!fecha) {
            return "";
        }

        const partes =
            fecha.split("-");

        return `${partes[2]}-${partes[1]}-${partes[0]}`;

    };


    return (

        <div className="lista-casa">

            <div className="lista-casa-header">

                <h2>
                    Movimientos Registrados
                </h2>

            </div>


            <div className="tabla-movimientos">

                {/* =========================
                    ENCABEZADOS
                ========================= */}

                <div className="fila-movimiento fila-movimiento-header">

                    <div>
                        CONCEPTO
                    </div>

                    <div>
                        FECHA
                    </div>

                    <div>
                        TIPO
                    </div>

                    <div>
                        MONTO
                    </div>

                    <div>
                        ACCIÓN
                    </div>

                </div>


                {/* =========================
                    MOVIMIENTOS
                ========================= */}

                {
                    [...movimientos]

                        .sort(
                            (
                                a: any,
                                b: any
                            ) =>
                                b.fecha.localeCompare(
                                    a.fecha
                                )
                        )

                        .map(
                            (m: any) =>

                                <div
                                    key={m.id}
                                    className="fila-movimiento"
                                >

                                    {/* Concepto */}

                                    <div>

                                        <div className="nombre-alumno">

                                            {m.concepto}

                                        </div>

                                    </div>


                                    {/* Fecha */}

                                    <div>

                                        <small>

                                            {
                                                formatearFecha(
                                                    m.fecha
                                                )
                                            }

                                        </small>

                                    </div>


                                    {/* Tipo */}

                                    <div>

                                        <span
                                            className={
                                                m.tipo === "INGRESO"
                                                    ? "estado-ingreso"
                                                    : "estado-egreso"
                                            }
                                        >
                                            {m.tipo}
                                        </span>

                                    </div>


                                    {/* Monto */}

                                    <div className="monto-movimiento">

                                        <strong>

                                            $
                                            {
                                                Number(
                                                    m.monto
                                                ).toLocaleString()
                                            }

                                        </strong>

                                    </div>


                                    {/* Acción */}

                                    <div>

                                        <button
                                            className="btn-editar"
                                            onClick={
                                                () =>
                                                    onSeleccionar(m)
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

    );

}

export default MovimientoList;