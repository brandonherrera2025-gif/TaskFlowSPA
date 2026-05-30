import { renderLogin, setupLogin } from "../views/auth/login";
import { renderRegister, setupRegister } from "../views/auth/register";
import { renderDashboard, setupDashboard } from "../views/dashboard";
import { renderAdmin, setupAdmin } from "../views/admin";
import { renderHome } from "../views/home";
import { renderTasks, setupTasksFromView } from "../views/tasks";
import { renderTaskForm, setupTaskFormFromView } from "../views/taskForm";
import { renderProfile, setupProfileFromView } from "../views/profile";


const routes = {

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
        setup: setupTasksFromView,
    },
    "/task/new": {
        render: renderTaskForm,
        isAuthorized: true,
        setup: setupTaskFormFromView,
    },
    "/profile": {
        render: renderProfile,
        isAuthorized: true,
        setup: setupProfileFromView,
    },
    "/admin": {
        render: renderAdmin,
        setup: setupAdminView,
        isAuthorized: false,
        requiredRole:[ "ADMIN" ]
    },
};
export const notFoundView = RenderNotFound