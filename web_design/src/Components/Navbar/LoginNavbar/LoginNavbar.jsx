import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function LoginNavbar() {
  const location = useLocation();
  const [isForm, setIsForm] = useState("");

  const isActive = (path) => (location.pathname === path ? "active" : "");

  useEffect(() => {
    if (location.pathname === "/form") {
      setIsForm("d-none");
    } else {
      setIsForm("");
    }
  }, [location]);

  return (
    <header className={`shadow-sm sticky-top bg-white`} style={{ zIndex: 999 }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand textDeep fs-4 fw-bold" to="/">
            Project TK
          </Link>

          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler btn-outline-deep"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link
              to={`/form`}
              className={`btn btn-outline-deep ms-2 ${
                isForm ? "d-none" : "d-md-none"
              }`}
            >
              Login
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link textDeepBlue fw-bold fs-5 ${isActive(
                    "/"
                  )}`}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link textDeepBlue fw-bold fs-5 ${isActive(
                    "/contact"
                  )}`}
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <Link
              to={`/form`}
              className={`btn ${
                isForm ? "d-none" : "d-lg-flex d-none"
              } btn-outline-deep ms-2`}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
