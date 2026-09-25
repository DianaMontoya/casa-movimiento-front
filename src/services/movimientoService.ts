const API = "http://localhost:8080/movimientos";

/**
 * Obtiene todos los movimientos.
 */
export async function obtenerMovimientos() {

    const res = await fetch(API);

    if (!res.ok) {
        throw new Error(
            `Error ${res.status} al obtener movimientos`
        );
    }

    return await res.json();
}


/**
 * Guarda un nuevo movimiento.
 */
export async function guardarMovimiento(
    movimiento: any
) {

    const res = await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(movimiento)

    });

    if (!res.ok) {

        const texto = await res.text();

        throw new Error(
            `Error ${res.status}: ${texto}`
        );
    }

    return await res.json();
}


/**
 * Actualiza un movimiento existente.
 */
export async function actualizarMovimiento(
    id: number,
    movimiento: any
) {

    const res = await fetch(
        `${API}/${id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(movimiento)

        }
    );

    if (!res.ok) {

        const texto = await res.text();

        throw new Error(
            `Error ${res.status}: ${texto}`
        );
    }

    return await res.json();
}