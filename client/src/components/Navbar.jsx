import { useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogoutUser } from "@/features/auth/actions";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(fetchLogoutUser());
    setMenuOpen(false);
  };

  return (
    <header className="relative bg-blue-900 text-white shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="text-2xl font-bold tracking-wide uppercase">Kanban</div>

        {/* Hamburger icon for mobile */}
        <button
          className="block text-3xl md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* Desktop nav */}
        <ul className="hidden gap-6 text-lg md:flex">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "font-semibold underline" : "hover:underline"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "font-semibold underline" : "hover:underline"
              }
            >
              Dashboard
            </NavLink>
          </li>
          {!user ? (
            <li>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive ? "font-semibold underline" : "hover:underline"
                }
              >
                Login / Register
              </NavLink>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="text-left hover:underline focus:outline-none"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Menu in <aside> */}
      {menuOpen && (
        <aside className="bg-opacity-50 fixed inset-0 z-50 bg-black/50 md:hidden">
          <div className="absolute top-0 right-0 h-full w-64 bg-white text-black shadow-lg transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <ul className="flex flex-col gap-4 p-4 text-lg">
              <li>
                <NavLink
                  to="/"
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "font-semibold underline" : "hover:underline"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "font-semibold underline" : "hover:underline"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                {user ? (
                  <NavLink
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "font-semibold underline" : "hover:underline"
                    }
                  >
                    Profile
                  </NavLink>
                ) : (
                  <NavLink
                    to="/auth"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "font-semibold underline" : "hover:underline"
                    }
                  >
                    Login / Register
                  </NavLink>
                )}
              </li>
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-left hover:underline focus:outline-none"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </aside>
      )}
    </header>
  );
}

export default Navbar;
