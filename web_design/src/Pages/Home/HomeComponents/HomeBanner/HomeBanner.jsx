import React from "react";
import HomeDrag from "./HomeDrag";
import { Link } from "react-router-dom";

export default function HomeBanner() {
  return (
    <>
      <section className="overflow-hidden position-relative align-content-center">
        <div className="container">
          <div className="row flex-column-reverse flex-md-row align-items-center">
            <div className="col-md-6 textDeep p-3 p-md-0">
              <h2 className="fs-1 fw-bold mb-4 hoverEffect">
                Easy File Upload & Sharing
              </h2>
              <p className="fs-5 textJustify pe-md-5">
                Upload and share your files effortlessly. Simply drag and drop
                your files here to start sharing them securely with others.
              </p>
              <Link to="/form" className="btn btn-deep btn-lg mt-4 fw-semibold">
                Let's Start with Login
              </Link>
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <HomeDrag />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
