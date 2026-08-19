const API = "http://localhost:8080/clases";

/**
 * Obtiene todas las clases registradas.
 */
export async function obtenerClases() {

    const res = await fetch("http://localhost:8080/clases");

    return await res.json();

}

/**
 * Registra una nueva clase.
 */
export async function guardarClase(clase:any){

    await fetch(API,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(clase)

    });

}

/**
 * Actualiza una clase existente.
 */
export async function actualizarClase(clase:any){

    await fetch(`${API}/${clase.id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(clase)

    });

}

/**
 * Elimina una clase.
 */
export async function eliminarClase(id:number){

    await fetch(`${API}/${id}`,{

        method:"DELETE"

    });

}