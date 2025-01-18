import React from "react";

export default function InnerPagesBanner({ BannerData }) {
  return (
    <>
      <section
        className="bgGradient py-5 overflow-hidden position-relative align-content-center"
        style={{ zIndex: "0", minHeight: "100vh" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 text-center text-light historyBanner">
              <h2>
                <i className={`fa-solid fa-${BannerData.icon}`}></i>
              </h2>
              <h3>{BannerData.heading}</h3>
              <p>{BannerData.para}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
