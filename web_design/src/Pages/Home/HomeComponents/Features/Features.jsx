import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import MyFeatures from "./MyFeatures.json";

export default function Features() {
  const owlOptions = {
    loop: true,
    margin: 10,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 textDeep">
            <h2
              className="text-center mb-4 mainHeading text-uppercase fw-bold"
              style={{ "--text": "'OUR FEATURES'" }}
            >
              OUR FEATURES
            </h2>
            <p className="text-center">
              Here are some frequently asked questions to help you get started
              with our file sharing and storage system.
            </p>
          </div>
        </div>
        <OwlCarousel className="owl-theme" {...owlOptions}>
          {MyFeatures.map((feature, index) => (
            <div className="item" key={index}>
              <div className="card border-0 shadow-sm rounded-lg h-100">
                <div className="card-header bg-transparent text-center py-4">
                  <i
                    className={`fa ${feature.iconClass} text-white bg-deep rounded p-3 fs-2`}
                  ></i>
                </div>
                <div className="card-body textDeep text-center">
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
}
