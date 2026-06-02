const API = "http://localhost:3000/tasks";

export async function obtenerTareas() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Error al obtener tareas");
  return res.json();
}

export async function obtenerTareaPorId(id) {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) throw new Error("Error al obtener la tarea");
  return res.json();
}

export async function crearTarea(tarea) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarea),
  });
  if (!res.ok) throw new Error("Error al crear la tarea");
  return res.json();
}

export async function actualizarTarea(id, tarea) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarea),
  });
  if (!res.ok) throw new Error("Error al actualizar la tarea");
  return res.json();
}

export async function eliminarTarea(id) {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar la tarea");
  return res.json();
}
