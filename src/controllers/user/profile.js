import { getSession, saveSession, clearSession } from "../../services/auth.service";

const API = "http://localhost:3000/users";

export async function setupProfile() {
  const user = getSession();
  if (!user) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("profile-email");

  nameInput.value = `${user.name} ${user.lastname || ""}`.trim();
  emailInput.value = user.email;

  const form = document.getElementById("profile-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const [name, lastname = ""] = nameInput.value.split(" ");
    const updatedUser = {
      ...user,
      name,
      lastname,
      email: emailInput.value,
      password: document.getElementById("password-new").value || user.password,
    };

    try {
      const res = await fetch(`${API}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      await res.json();
      saveSession(updatedUser);
      alert("Perfil actualizado correctamente");
    } catch (error) {
      alert(`Error al actualizar perfil: ${error.message}`);
    }
  });

  const deleteBtn = document.getElementById("delete-account-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
      if (!confirm("Seguro que deseas eliminar tu cuenta?")) return;
      try {
        const res = await fetch(`${API}/${user.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar");
        clearSession();
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      } catch (error) {
        alert(`Error al eliminar cuenta: ${error.message}`);
      }
    });
  }
}
