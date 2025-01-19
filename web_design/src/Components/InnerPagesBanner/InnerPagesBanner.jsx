import React from "react";
import { Link } from "react-router-dom";

export default function InnerPagesBanner({ heading }) {
  return (
    <section className="py-3 bg-deep text-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6">
            <h3
              className="mb-0 fs-md-2 fs-5"
              style={{ textTransform: "capitalize" }}
            >
              {heading}
            </h3>
          </div>
          <div className="col-6 text-end px-2">
            <h4 className="mb-0 text-nowrap align-content-center fs-md-3 fs-6">
              <Link
                to="/"
                className="text-decoration-none fs-md-3 fs-6 text-white"
              >
                Home
              </Link>
              <span className="mx-2 fs-md-3 fs-6">/</span>
              {heading}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
