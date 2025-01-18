import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import img from "../../../../Image/Wave.jpg";

import MyFeatures from "./MyFeatures.json";

export default function Features() {
  const owlOptions = {
    loop: true,
    margin: 20,
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

  const getColor = (index) => {
    switch ((index + 1) % 5) {
      case 0:
        return "#a78bfa";
      case 4:
        return "#10b981";
      case 3:
        return "#fbbf24";
      case 2:
        return "#ef4444";
      default:
        return "#06b6d4";
    }
  };

  return (
    <section className="bg-white py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2
              className="text-center mb-4 mainHeading text-uppercase fw-bold"
              style={{ "--text": "'Our Key Features'" }}
            >
              Our Key Features
            </h2>
            <p className="text-center">
              Explore the innovative features that set us apart. We offer a
              range of solutions designed to enhance your experience, with
              top-quality performance and user-friendly design.
            </p>
          </div>
        </div>
        <OwlCarousel className="owl-theme" {...owlOptions}>
          {MyFeatures.map((feature, index) => (
            <div className="item" key={index}>
              <div
                className="featureCard position-relative rounded overflow-hidden border align-content-center minHeigth300"
                style={{ "--cardColor": getColor(index) }}
              >
                <img
                  src={img}
                  className="position-absolute top-0 start-0 w-100 h-100 featureImg"
                  alt="Feature Background"
                />
                <div className="featureCardContent p-4 text-center text-white">
                  <div className="featureCardIcon mb-3">
                    <i
                      className={`fa ${feature.iconClass} p-3 fs-2 rounded-4 shadow`}
                      style={{
                        background: "rgba(255, 255, 255, 0.7)",
                        color: getColor(index),
                      }}
                    ></i>
                  </div>
                  <h3 className="featureCardTitle mb-2">{feature.title}</h3>
                  <p className="featureCardText">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
}
