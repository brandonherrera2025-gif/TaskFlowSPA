import { crearUsuario } from "../../services/user.service";

export function setupRegister() {
  const form = document.getElementById("register-form");
  const nombre = document.getElementById("register-name");
  const apellido = document.getElementById("register-lastname");
  const email = document.getElementById("register-email");
  const password = document.getElementById("register-password");
  const role = document.getElementById("register-role");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newUser = {
      name: nombre.value,
      lastname: apellido.value,
      email: email.value,
      password: password.value,
      roles: [role.value]
    };

    try {
      await crearUsuario(newUser);
      showSuccessToast("Usuario creado exitosamente");
      window.history.pushState({}, "", "/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (error) {
      showErrorToast(`Error al crear el usuario: ${error.message}`);
    }
  });
}
