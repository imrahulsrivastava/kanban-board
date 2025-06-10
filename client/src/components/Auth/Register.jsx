import { useState } from "react";

function Register({ handleOnSubmitRegister }) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleOnSubmitRegister({
      fullname: fullname.trim() || "",
      username: username.trim() || "",
      email: email.trim() || "",
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
            Register
          </h2>
        </header>

        <fieldset
          className="flex flex-col gap-4"
          aria-label="Registration form"
        >
          <label htmlFor="fullname" className="flex flex-col text-gray-700">
            <span className="mb-1 text-base font-medium">Full Name</span>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              required
              autoComplete="off"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </label>

          <label htmlFor="username" className="flex flex-col text-gray-700">
            <span className="mb-1 text-base font-medium">Username</span>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </label>

          <label htmlFor="email" className="flex flex-col text-gray-700">
            <span className="mb-1 text-base font-medium">Email</span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
        </footer>
      </form>
    </section>
  );
}

export default Register;
