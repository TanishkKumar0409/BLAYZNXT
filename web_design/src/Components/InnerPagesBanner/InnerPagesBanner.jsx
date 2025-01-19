import React from "react";
import { Link } from "react-router-dom";

export default function InnerPagesBanner({ heading }) {
  return (
    <section className="py-3 bg-deep text-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6">
            <h3 className="mb-0">{heading}</h3>
          </div>
          <div className="col-6 text-end">
            <h4 className="mb-0">
              <Link to="/" className="text-decoration-none text-white">
                Home
              </Link>
              <span className="mx-2">/</span>
              {heading}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
