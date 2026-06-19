const API_URL = "http://localhost:8080/movimientos";

export const obtenerMovimientos = async ()=>{
    const response = await fetch(API_URL);
    return await response.json();
};

export const guardarMovimiento = async (movimiento:any)=>{
    const response = await fetch(
            API_URL,
            {
                method:"POST",
                headers:{
                    "Content-Type":
                        "application/json"
                },
                body:
                    JSON.stringify(
                        movimiento
                    )
            }
        );
    return await response.json();
};

export const actualizarMovimiento = async ( id:number, movimiento:any )=>{
    const response = await fetch(
            `${API_URL}/${id}`,
            {
                method:"PUT",

                headers:{
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        movimiento
                    )
            }
        );
    return await response.json();
};