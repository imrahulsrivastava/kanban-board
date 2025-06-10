import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

function ProtectedRoutes() {
  const user = useSelector((state) => state.auth.user);
  return user ? (
    <div className="mx-auto max-w-5xl">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/auth" replace />
  );
}

export default ProtectedRoutes;
