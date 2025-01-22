import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import MyTestimonials from "./MyTestimonials.json";

export default function Testimonials() {
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
    <>
      <section className="py-5">
        <div className="container testimonials">
          <h2
            className="text-center mb-4 mainHeading text-uppercase fw-bold"
            style={{ "--text": "'Testimonials'" }}
          >
            Testimonials
          </h2>
          <p className="text-center">
            Read what our satisfied customers have to say about our services.
            Their feedback helps us improve and continue delivering top-notch
            experiences.
          </p>
          <OwlCarousel className="owl-theme" {...owlOptions}>
            {MyTestimonials.map((testimonial, index) => (
              <div className="item" key={index}>
                <div className="d-flex flex-column text-white shadow-sm">
                  <div
                    className="p-3 testimonialsBanner fw-semibold border-bottom textJustify align-content-center"
                    style={{
                      minHeight: "400px",
                    }}
                  >
                    <p>{testimonial.text}</p>
                  </div>
                  <div className="d-flex">
                    <div style={{ width: "30%" }}>
                      <img
                        src={testimonial.image}
                        className="img-fluid h-100"
                        style={{ aspectRatio: "1/1", objectFit: "cover" }}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="p-3 align-content-center">
                      <h2 className="fs-4 textDeep">{testimonial.name}</h2>
                      <h3 className="textDeepBlue fs-6">{testimonial.role}</h3>
                      <div className="stars">
                        {Array.from(
                          { length: testimonial.stars },
                          (_, index) => (
                            <i
                              key={index}
                              className="fa fa-star text-warning"
                            ></i>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </section>
    </>
  );
}
