const API_URL = "http://localhost:8080/alumnos";

export const obtenerAlumnos =
async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const guardarAlumno = async (alumno:any) => {
    const response = await fetch(
        API_URL,
        {
            method: "POST",
            headers: {
                "Content-Type":
                "application/json"
            },
            body:
            JSON.stringify(
                alumno
            )
        }
    );
    return await response.json();
};

export const actualizarAlumno = async (alumno:any) => {
    const response = await fetch(
        `${API_URL}/${alumno.id}`,
        {
            method:"PUT",
            headers:{
                "Content-Type":
                "application/json"
            },
            body:
            JSON.stringify(
                alumno
            )
        }
    );
    return await response.json();
};