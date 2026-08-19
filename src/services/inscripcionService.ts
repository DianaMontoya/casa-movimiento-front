const API = "http://localhost:8080/inscripciones";

/**
 * Obtiene todas las inscripciones
 */
export async function obtenerInscripciones() {

    const res = await fetch(API);

    if (!res.ok) {
        throw new Error(`Error ${res.status} al obtener inscripciones`);
    }

    return await res.json();
}


/**
 * Crea una inscripción alumno → clase
 *
 * La fecha de inscripción se genera automáticamente.
 */
export async function inscribirAlumno(inscripcion: any) {

    const inscripcionCompleta = {

        ...inscripcion,

        fechaInscripcion: new Date()
            .toISOString()
            .split("T")[0]

    };

    console.log("INSCRIPCIÓN ENVIADA:", inscripcionCompleta);

    const res = await fetch(API, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(inscripcionCompleta)

    });

    if (!res.ok) {

        const texto = await res.text();

        console.error("STATUS INSCRIPCIÓN:", res.status);
        console.error("RESPUESTA INSCRIPCIÓN:", texto);

        throw new Error(
            `Error ${res.status}: ${texto}`
        );
    }

    return await res.json();

}


/**
 * Elimina inscripción (desinscribir alumno)
 */
export async function eliminarInscripcion(id: number) {

    const res = await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

    if (!res.ok) {

        const texto = await res.text();

        throw new Error(
            `Error ${res.status}: ${texto}`
        );
    }

}