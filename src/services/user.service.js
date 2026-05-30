export async function crearUsuario(usuario) {
    const response = await fetch("http://localhost:3000/user", {
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
    const response = await fetch(`http://localhost:3000/user`,);
    if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
    }

    return await response.json();
}
export async function obtenerUsuariosPorEmail( email ) {
    const response = await fetch(`http://localhost:3000/users?email=${email}`);
    if (!response.ok) {
        throw new Error("Error al obtener el usuario email");
    }
    const usuario = await response.json();
    return usuario.length > 0 ? usuario[o] : null;
}