import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function InnerPagesBanner({ heading }) {
  const head = useRef(heading);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/main/file/view/")) {
      head.current = "File View";
    }
  }, [location.pathname]);

  return (
    <section className="py-4 bg-deep text-white">
      <div className="container py-2">
        <div className="row align-items-center">
          <div className="col-6">
            <h3 className="mb-0 fs-5 text-truncate">{heading}</h3>
          </div>
          <div className="col-6 d-flex justify-content-end align-content-center">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb text-white fw-bold align-content-center m-0">
                <li className="breadcrumb-item">
                  <Link
                    to="/"
                    className="text-decoration-none forgotBtn text-white"
                  >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item text-white">{head.current}</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
