import { obtenerUsuarios } from "../../services/user.service";

const API = "http://localhost:3000/users";

export async function setupAdmin() {
  const container = document.getElementById("admin-users-container");
  if (!container) return;

  try {
    const users = await obtenerUsuarios();
    container.innerHTML = users.map(user => `
      <div class="rounded-2xl bg-blue-50 p-4">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="font-bold text-slate-900">${user.name} ${user.lastname || ""}</p>
            <p class="text-sm text-slate-500">${user.email}</p>
          </div>
          <div class="flex gap-2">
            <span class="rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">${(user.roles || []).join(", ")}</span>
            <button class="btn-toggle-role rounded-full border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-white"
              data-user-id="${user.id}" data-current-role="${(user.roles || ["USER"])[0]}">
              Cambiar rol
            </button>
          </div>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".btn-toggle-role").forEach(btn => {
      btn.addEventListener("click", async () => {
        const userId = btn.dataset.userId;
        const currentRole = btn.dataset.currentRole;
        const newRole = currentRole === "ADMIN" ? "USER" : "ADMIN";

        try {
          const res = await fetch(`${API}/${userId}`);
          const targetUser = await res.json();

          const updated = { ...targetUser, roles: [newRole] };
          await fetch(`${API}/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
          });

          setupAdmin();
        } catch (error) {
          alert(`Error al cambiar rol: ${error.message}`);
        }
      });
    });
  } catch (error) {
    container.innerHTML = `<p class="text-slate-500">Error al cargar usuarios</p>`;
  }
}
