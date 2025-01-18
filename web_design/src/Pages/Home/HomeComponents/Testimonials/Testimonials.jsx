import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import MyTestimonials from "./MyTestimonials.json";

export default function Testimonials() {
  const owlOptions = {
    loop: true,
    margin: 20,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1000: { items: 2 },
    },
  };

  const getValue = () => {
    const createRandom = Math.floor(Math.random() * 999999);
    return createRandom;
  };

  return (
    <>
      <section className="bg-light py-5">
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
                <div className="testimonialCard d-flex flex-column bg-white shadow-sm">
                  <div
                    className="testimonialCardHead py-3 text-white p-3 textJustify align-content-center"
                    style={{
                      minHeight: "350px",
                      filter: `hue-rotate(${getValue()}deg)`,
                    }}
                  >
                    <p>{testimonial.text}</p>
                  </div>
                  <div className="testimonialCardBody d-flex">
                    <div
                      className="testimonialCardImage "
                      style={{ width: "30%" }}
                    >
                      <img
                        src={testimonial.image}
                        className="img-fluid h-100"
                        style={{ aspectRatio: "1/1", objectFit: "cover" }}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="testimonialCardAbout p-3 align-content-center">
                      <h2 className="fs-4 text-black">{testimonial.name}</h2>
                      <h3 className="text-muted fs-6">{testimonial.role}</h3>
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
