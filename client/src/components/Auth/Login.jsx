import { useState } from "react";

function Login({ handleOnSubmitLogin }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleOnSubmitLogin({
      loginId: loginId.trim() || "",
      password: password.trim() || "",
    });
  };

  return (
    <section className="flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-md sm:p-8"
      >
        <header className="mb-6">
          <h2 className="text-center text-3xl font-bold text-gray-800">
            Login
          </h2>
        </header>

        <fieldset className="flex flex-col gap-4" aria-label="Login form">
          <label htmlFor="loginId" className="flex flex-col text-gray-700">
            <span className="mb-1 text-base font-medium">Login ID</span>
            <input
              type="text"
              id="loginId"
              name="loginId"
              placeholder="Enter your login ID"
              required
              autoComplete="off"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </label>

          <label htmlFor="password" className="flex flex-col text-gray-700">
            <span className="mb-1 text-base font-medium">Password</span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </label>
        </fieldset>

        <footer className="mt-6">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Login
          </button>
        </footer>
      </form>
    </section>
  );
}

export default Login;
