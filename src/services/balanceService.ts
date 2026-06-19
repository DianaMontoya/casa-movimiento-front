const API_URL = "http://localhost:8080/pagos/balance";

export const obtenerBalance = async (
    desde:string,
    hasta:string,
    metodo:string
)=>{
    let url = `${API_URL}?desde=${desde}&hasta=${hasta}`;

    if( metodo && metodo !== "TODOS" ){
        url += `&metodo=${metodo}`;
    }

    const response = await fetch(url);

    return await response.json();
};