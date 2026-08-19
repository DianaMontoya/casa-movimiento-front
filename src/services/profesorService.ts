const API = "http://localhost:8080/profesores";

/**
 * Obtiene el listado completo de profesores registrados.
 */
export async function obtenerProfesores() {

    const respuesta = await fetch(API);

    return await respuesta.json();

}

/**
 * Registra un nuevo profesor.
 */
export async function guardarProfesor(profesor: any) {

    await fetch(API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(profesor)

    });

}

/**
 * Actualiza la información de un profesor existente.
 */
export async function actualizarProfesor(profesor: any) {

    await fetch(`${API}/${profesor.id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(profesor)

    });

}

/**
 * Elimina un profesor por su identificador.
 */
export async function eliminarProfesor(id: number) {

    await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

}