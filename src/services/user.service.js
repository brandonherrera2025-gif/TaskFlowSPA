const API = "http://localhost:3000/users";

export async function crearUsuario(usuario) {
    const response = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    if (!response.ok) {
        throw new Error("Error al crear el usuario");
    }

    return await response.json();
}

export async function obtenerUsuarios() {
    const response = await fetch(API);
    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }

    return await response.json();
}

export async function obtenerUsuariosPorEmail(email) {
    const response = await fetch(`${API}?email=${email}`);
    if (!response.ok) {
        throw new Error("Error al obtener el usuario email");
    }
    const usuarios = await response.json();
    return usuarios.length > 0 ? usuarios[0] : null;
}