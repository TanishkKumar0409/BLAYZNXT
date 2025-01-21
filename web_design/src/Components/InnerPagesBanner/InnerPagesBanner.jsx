import React from "react";
import { Link } from "react-router-dom";

export default function InnerPagesBanner({ heading }) {
  return (
    <section className="py-4 bg-deep text-white">
      <div className="container py-2">
        <div className="row align-items-center">
          <div className="col-6">
            <h3 className="mb-0 fs-5 text-truncate">{heading}</h3>
          </div>
          <div className="col-6 text-end px-2 ">
            <h4 className="mb-0 text-nowrap text-truncate align-content-center fw-bold fs-6">
              <Link
                to="/"
                className="text-decoration-none forgotBtn text-white"
              >
                Home
              </Link>
              <span className="mx-2 fs-6">/</span>
              {heading}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
