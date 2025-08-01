import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (
    <>
      <li>
        <a
          href="/"
          onClick={() => setMenuOpen(false)}
          className="hover:text-blue-600 transition-colors duration-300"
        >
          Home
        </a>
      </li>
      <li>
        <a
          href="/about"
          onClick={() => setMenuOpen(false)}
          className="hover:text-blue-600 transition-colors duration-300"
        >
          Contact Us
        </a>
      </li>
    </>
  );

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        sticky ? "shadow-md bg-white" : "bg-transparent"
      }`}
    >
      <div className="navbar max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center h-16 flex-nowrap">
        {/* Left: Logo + Hamburger */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            className="lg:hidden btn btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          <a className="text-sm sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent break-words">
            Education📘Preparation
          </a>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 text-base">{navLinks}</ul>
        </nav>

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-2 flex-nowrap min-w-0">
          {authUser ? (
            <Logout />
          ) : (
            <>
              <button
                className="btn btn-sm md:btn-md btn-primary whitespace-nowrap min-w-[64px]"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Login
              </button>
              <Login />
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        } backdrop-blur-md`}
      >
        <ul className="menu p-4 text-base">{navLinks}</ul>
      </div>
    </header>
  );
}

export default Navbar;
