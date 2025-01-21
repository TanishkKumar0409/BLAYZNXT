import React from "react";

export default function ImageView({ data }) {
  const APIurl = process.env.REACT_APP_API;
  return (
    <>
      <section className="p-4 rounded">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 align-content-center">
              <img
                src={`${APIurl}${data.filePath}`}
                className="rounded shadow img-fluid"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
