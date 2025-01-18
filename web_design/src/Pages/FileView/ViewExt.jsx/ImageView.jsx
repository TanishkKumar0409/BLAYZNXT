import React from "react";

export default function ImageView({ data }) {
  const APIurl = process.env.REACT_APP_API;
  return (
    <>
      <section className="bg-light py-5 rounded">
        <div className="container">
          <img
            src={`${APIurl}${data.filePath}`}
            className="rounded shadow mb-3 img-fluid"
            alt=""
          />
          <h2 className="text-dark fw-bold">{data.root}</h2>
        </div>
      </section>
    </>
  );
}
