import { obtenerTareas, eliminarTarea } from "../../services/task.service";
import { getSession } from "../../services/auth.service";

export async function setupTasks() {
  const container = document.getElementById("tasks-container");
  if (!container) return;

  const user = getSession();
  if (!user) return;

  try {
    const allTasks = await obtenerTareas();
    const tareas = user.roles?.includes("ADMIN")
      ? allTasks
      : allTasks.filter(t => String(t.userId) === String(user.id));

    if (tareas.length === 0) {
      container.innerHTML = `<p class="text-slate-500 text-center py-10">No hay tareas disponibles.</p>`;
      return;
    }

    container.innerHTML = tareas.map(t => `
      <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50" data-task-id="${t.id}">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">${t.status || "Pendiente"}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-900">${t.title}</h2>
            <p class="mt-3 max-w-2xl text-slate-600">${t.description || ""}</p>
          </div>
          <div class="flex gap-3">
            <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              href="/task/edit?id=${t.id}">Editar</a>
            <button class="btn-delete-task rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              data-task-id="${t.id}">Eliminar</button>
          </div>
        </div>
      </article>
    `).join("");

    container.querySelectorAll(".btn-delete-task").forEach(btn => {
      btn.addEventListener("click", async () => {
        const taskId = btn.dataset.taskId;
        if (!confirm("Eliminar esta tarea?")) return;
        try {
          await eliminarTarea(taskId);
          setupTasks();
        } catch (error) {
          alert(`Error al eliminar: ${error.message}`);
        }
      });
    });
  } catch (error) {
    container.innerHTML = `<p class="text-slate-500 text-center py-10">Error al cargar tareas</p>`;
  }
}
