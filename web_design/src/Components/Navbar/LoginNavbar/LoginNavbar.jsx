import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function LoginNavbar() {
  const location = useLocation();
  const navCondition = location.pathname === "/form" ? "d-none" : "";

  const [navClass, setNavclass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      var pageScroll = window.scrollY;
      setNavclass(pageScroll > 100 ? "navbarCustom" : "");
    });
  });

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <header
      className={`responsiveNavbar position-fixed w-100 ${navClass} ${navCondition}`}
      style={{ zIndex: 999 }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-4 fw-bold" to="/">
            Project TK
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link fw-bold fs-5 ${isActive("/")}`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link fw-bold fs-5 ${isActive("/contact")}`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <Link to="/form" className="btn btn-custom custom-btn ms-2">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
