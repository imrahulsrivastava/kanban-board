import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Login from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import { fetchNewUser, fetchUser } from "@/features/auth/actions";
import { STATUS } from "@/constants";

function AuthPage() {
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isNewUser, setIsNewUser] = useState(false);

  const handleOnSubmitRegister = ({ fullname, username, email, password }) => {
    dispatch(fetchNewUser({ fullname, username, email, password }));
  };

  const handleOnSubmitLogin = ({ loginId, password }) => {
    dispatch(fetchUser({ loginId, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <main className="bg-gray-100 p-6 sm:p-8">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-lg md:p-10">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {isNewUser ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="text-gray-600">
            {isNewUser ? "Register to get started" : "Login to your account"}
          </p>
        </header>

        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setIsNewUser((prev) => !prev)}
            className="rounded-md bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            Switch to {isNewUser ? "Login" : "Register"}
          </button>
        </div>

        <section className="mb-6">
          {isNewUser ? (
            <Register handleOnSubmitRegister={handleOnSubmitRegister} />
          ) : (
            <Login handleOnSubmitLogin={handleOnSubmitLogin} />
          )}
        </section>

        <footer className="text-center">
          {status === STATUS.LOADING && (
            <p className="text-blue-600">Loading...</p>
          )}
          {error && <p className="text-red-600">Error: {error.message}</p>}
          {user && <p className="text-green-600">{user.message}</p>}
        </footer>
      </section>
    </main>
  );
}

export default AuthPage;
