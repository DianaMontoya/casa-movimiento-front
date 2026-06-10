const API_URL =
"http://localhost:8080/pagos";

export const obtenerPagos =
async () => {

    const response =
    await fetch(API_URL);

    return await response.json();

};

export const guardarPago =
async (pago:any) => {

    const response =
    await fetch(
        API_URL,
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(
                pago
            )
        }
    );

    return await response.json();

};

export const actualizarPago =
async (
    id:number,
    pago:any
)=>{

    const response =
    await fetch(

        `${API_URL}/${id}`,

        {

            method:"PUT",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(
                pago
            )

        }

    );

    return await response.json();

};