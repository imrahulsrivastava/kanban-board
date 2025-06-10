import { lazy } from "react";
import { createBrowserRouter } from "react-router";
const HomePage = lazy(() => import("@/pages/HomePage"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const ProtectedRoutes = lazy(() => import("@/components/ProtectedRoutes"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const EditTodo = lazy(() => import("@/pages/EditTodo"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "todos/:id",
            element: <EditTodo />,
          },
        ],
      },
    ],
  },
]);

export default router;
