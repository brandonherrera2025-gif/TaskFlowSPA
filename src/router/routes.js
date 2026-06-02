import { renderLogin } from "../views/auth/login";
import { renderRegister } from "../views/auth/register";
import { renderDashboard } from "../views/user/dashboard";
import { renderAdmin } from "../views/user/admin";
import { renderHome } from "../views/home";
import { renderTasks } from "../views/tasks/tasks";
import { renderTaskForm } from "../views/tasks/task-form";
import { renderProfile } from "../views/user/profile";
import { renderNotFound } from "../views/auth/not-found";

import { setupLogin } from "../controllers/auth/login";
import { setupRegister } from "../controllers/auth/register";
import { setupDashboard } from "../controllers/user/dashboard";
import { setupAdmin } from "../controllers/user/admin";
import { setupTasks } from "../controllers/tasks/tasks";
import { setupTaskForm } from "../controllers/tasks/task-form";
import { setupProfile } from "../controllers/user/profile";


export const routes = {

    "/": {
        render: renderHome,
    },

    "/login": {
        render: renderLogin,
        setup: setupLogin,
        isAuthorized: false
    },

    "/register": {
        render: renderRegister,
        setup: setupRegister,
        isAuthorized: false
    },
    "/dashboard": {
        render: renderDashboard,
        setup: setupDashboard,
        isAuthorized: true,
    },
    "/tasks": {
        render: renderTasks,
        isAuthorized: true,
        setup: setupTasks,
    },
    "/task/new": {
        render: renderTaskForm,
        isAuthorized: true,
        setup: setupTaskForm,
    },
    "/task/edit": {
        render: renderTaskForm,
        isAuthorized: true,
        setup: setupTaskForm,
    },
    "/profile": {
        render: renderProfile,
        isAuthorized: true,
        setup: setupProfile,
    },
    "/admin": {
        render: renderAdmin,
        setup: setupAdmin,
        isAuthorized: true,
        requiredRole: ["ADMIN"]
    },
};
export const notFoundView = renderNotFound