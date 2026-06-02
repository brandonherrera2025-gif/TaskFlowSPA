import { getSession } from "../../services/auth.service";
import { obtenerTareas } from "../../services/task.service";

export async function setupDashboard() {
  const user = getSession();
  const greeting = document.getElementById("dashboard-greeting");
  if (greeting && user) {
    greeting.textContent = `Bienvenido, ${user.name}.`;
  }

  try {
    const tareas = await obtenerTareas();
    const misTareas = tareas.filter(t => String(t.userId) === String(user?.id));
    const activas = misTareas.filter(t => t.status === "En progreso").length;
    const completadas = misTareas.filter(t => t.status === "Completada").length;
    const pendientes = misTareas.filter(t => t.status === "Pendiente").length;

    document.getElementById("stats-active").textContent = activas;
    document.getElementById("stats-completed").textContent = completadas;
    document.getElementById("stats-pending").textContent = pendientes;
  } catch (error) {
    console.error("Error al cargar estadisticas:", error);
  }
}
