import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { Sun, Moon, Menu, X } from "lucide-react";
import Login from "./login";
import Logout from "./logout";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { isAuthenticated, loading } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [showLogin, setShowLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  /* 🌙 Theme */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* 🔽 Shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/course");
    setMobileMenu(false);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 z-50 w-full transition-all
          ${scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow"
            : "bg-gray-200 dark:bg-gray-950"}
        `}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-16 h-16 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-pink-500"
          >
            Book<span className="text-black dark:text-white">Store</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-8 font-medium text-gray-600 dark:text-gray-300">
            <Link to="/" className="hover:text-pink-500">Home</Link>
            <Link to="/course" className="hover:text-pink-500">Courses</Link>
            <Link to="#" className="hover:text-pink-500">About</Link>
            <Link to="#" className="hover:text-pink-500">Contact</Link>
          </nav>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2"
          >
            <input
              type="text"
              placeholder="Search courses..."
              className="bg-transparent outline-none text-sm w-40"
            />
            <IoMdSearch className="text-xl ml-2" />
          </form>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            {/* THEME */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* AUTH (DESKTOP) */}
            {!loading && (
              <div className="hidden md:block">
                {isAuthenticated ? (
                  <Logout />
                ) : (
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600"
                  >
                    Login
                  </button>
                )}
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2"
            >
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <div className="lg:hidden bg-white dark:bg-gray-900 px-6 py-6 space-y-4 shadow-md">

            <Link onClick={() => setMobileMenu(false)} to="/" className="block">
              Home
            </Link>
            <Link onClick={() => setMobileMenu(false)} to="/course" className="block">
              Courses
            </Link>
            <Link to="#" className="block">About</Link>
            <Link to="#" className="block">Contact</Link>

            {/* MOBILE SEARCH */}
            <form onSubmit={handleSearch} className="flex items-center border rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Search courses..."
                className="flex-1 outline-none bg-transparent"
              />
              <IoMdSearch />
            </form>

            {/* AUTH MOBILE */}
            {!loading && (
              isAuthenticated ? (
                <Logout />
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setMobileMenu(false);
                  }}
                  className="w-full px-4 py-2 rounded-lg bg-pink-500 text-white"
                >
                  Login
                </button>
              )
            )}
          </div>
        )}
      </header>

      {/* LOGIN MODAL */}
      {showLogin && !isAuthenticated && (
        <Login onClose={() => setShowLogin(false)} />
      )}
    </>
  );
};

export default Navbar;
