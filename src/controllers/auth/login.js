import { obtenerUsuariosPorEmail } from "../../services/user.service";
import { saveSession } from "../../services/auth.service";

export function setupLogin() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const user = await obtenerUsuariosPorEmail(email);
      if (!user || user.password !== password) {
        alert("Credenciales invalidas");
        return;
      }
      saveSession(user);
      window.history.pushState({}, "", "/dashboard");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (error) {
      alert(`Error al iniciar sesion: ${error.message}`);
    }
  });
}
