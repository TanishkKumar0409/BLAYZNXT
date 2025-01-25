import React from "react";
import faqs from "./Question.json";

export default function FAQ() {
  const getRandomFAQs = (faqs, count) => {
    const shuffled = [...faqs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const selectedFAQs = getRandomFAQs(faqs, 4);

  return (
    <>
      <section className="bg-white py-5 othersBanner">
        <div className="container">
          <div className="row justify-content-center py-3">
            <div className="col-md-8 text-white">
              <h2
                className="text-center mb-4 mainHeading text-uppercase fw-bold"
                style={{ "--text": "'FAQs'" }}
              >
                FAQs
              </h2>
              <p className="text-center">
                Here are some frequently asked questions to help you get started
                with our file sharing and storage system.
              </p>
            </div>
          </div>
          <div
            id="faqCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner rounded-5 text-white">
              {selectedFAQs.map((faq, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="5000"
                >
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div className="text-center p-5">
                        <h3 className="mb-3">{faq.question}</h3>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#faqCarousel"
              data-bs-slide="prev"
              style={{ mixBlendMode: "difference" }}
            >
              <span
                className="carousel-control-prev-icon position-absolute start-0 ps-5"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next "
              type="button"
              data-bs-target="#faqCarousel"
              data-bs-slide="next"
              style={{ mixBlendMode: "difference" }}
            >
              <span
                className="carousel-control-next-icon position-absolute end-0 pe-5"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
