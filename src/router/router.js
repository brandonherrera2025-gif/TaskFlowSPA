import { routes, notFoundView } from "./routes";
import { isAuthenticated, getSession } from "../services/auth.service";

function hasRequiredRole(requiredRole) {
  if (!requiredRole) return true;
  const user = getSession();
  if (!user) return false;
  return requiredRole.some(role => (user.roles || []).includes(role));
}

export function renderRoute(path) {
  const app = document.getElementById("app");
  if (!app) return;

  const fullPath = path || window.location.pathname + window.location.search;
  const currentPath = fullPath.split("?")[0];
  const route = routes[currentPath];

  if (!route) {
    app.innerHTML = notFoundView();
    return;
  }

  if (route.isAuthorized && !isAuthenticated()) {
    window.history.pushState({}, "", "/login");
    renderRoute("/login");
    return;
  }

  if (route.requiredRole && !hasRequiredRole(route.requiredRole)) {
    window.history.pushState({}, "", "/");
    renderRoute("/");
    return;
  }

  app.innerHTML = route.render();

  if (route.setup) {
    route.setup();
  }
}

export function initRouter() {
  renderRoute();

  window.addEventListener("popstate", () => {
    renderRoute();
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("#")) return;

    if (href.startsWith("/")) {
      e.preventDefault();
      window.history.pushState({}, "", href);
      renderRoute(href);
    }
  });
}
