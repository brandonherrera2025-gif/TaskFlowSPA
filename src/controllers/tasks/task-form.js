import { crearTarea, actualizarTarea, obtenerTareaPorId } from "../../services/task.service";
import { getSession } from "../../services/auth.service";

export async function setupTaskForm() {
  const form = document.getElementById("task-form");
  if (!form) return;

  const user = getSession();
  if (!user) return;

  const params = new URLSearchParams(window.location.search);
  const editId = params.get("id");
  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("description");
  const statusSelect = document.getElementById("status");
  const dateInput = document.getElementById("date");

  if (editId) {
    try {
      const tarea = await obtenerTareaPorId(editId);
      if (String(tarea.userId) !== String(user.id) && !user.roles?.includes("ADMIN")) {
        alert("No tienes permiso para editar esta tarea");
        window.history.pushState({}, "", "/tasks");
        window.dispatchEvent(new PopStateEvent("popstate"));
        return;
      }
      titleInput.value = tarea.title || "";
      descInput.value = tarea.description || "";
      statusSelect.value = tarea.status || "Pendiente";
      dateInput.value = tarea.dueDate || "";
    } catch (error) {
      alert("Error al cargar la tarea");
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      title: titleInput.value,
      description: descInput.value,
      status: statusSelect.value,
      dueDate: dateInput.value,
      userId: user.id,
    };

    try {
      if (editId) {
        await actualizarTarea(editId, data);
      } else {
        await crearTarea(data);
      }
      window.history.pushState({}, "", "/tasks");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (error) {
      alert(`Error al guardar tarea: ${error.message}`);
    }
  });
}
