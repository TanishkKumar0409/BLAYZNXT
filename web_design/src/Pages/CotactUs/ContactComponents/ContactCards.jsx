import React, { useEffect, useState } from "react";
import img from "../../../Image/Wave.jpg";

export default function ContactCards() {
  const numberGentrator = () => Math.floor(Math.random() * 5 + 1);

  const [Card1, setCard1] = useState(numberGentrator);
  const [Card2, setCard2] = useState(numberGentrator);
  const [Card3, setCard3] = useState(numberGentrator);

  useEffect(() => {
    const handleUnEqual = () => {
      if (Card1 === Card2 || Card1 === Card3) {
        setCard1(numberGentrator);
      }
      if (Card2 === Card1) {
        setCard2(numberGentrator);
      }
      if (Card3 === Card1 || Card3 === Card2) {
        setCard3(numberGentrator);
      }
    };

    handleUnEqual();
  }, [Card1, Card2, Card3]);

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
        <div className="row">
          <div className="col-md-4 p-2">
            <div
              className="featureCard minHeigth300 align-content-center position-relative rounded overflow-hidden border"
              style={{ "--cardColor": getColor(Card1) }}
            >
              <img
                src={img}
                className="position-absolute top-0 start-0 w-100 h-100 featureImg"
                alt="Feature Background"
              />
              <div className="featureCardContent p-4 text-center text-white">
                <div className="featureCardIcon mb-3">
                  <i
                    className="fa fa-envelope p-3 fs-2 rounded-4 shadow"
                    style={{
                      background: "rgba(255, 255, 255, 0.7)",
                      color: getColor(Card1),
                    }}
                  ></i>
                </div>
                <h3 className="featureCardTitle mb-2">Email:</h3>
                <a
                  href="mailto:tanishkk60@gmail.com"
                  className="featureCardText text-light text-decoration-none fs-4 fw-semibold"
                >
                  tanishkk60@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 p-2">
            <div
              className="featureCard minHeigth300 align-content-center position-relative rounded overflow-hidden border"
              style={{ "--cardColor": getColor(Card2) }}
            >
              <img
                src={img}
                className="position-absolute top-0 start-0 w-100 h-100 featureImg"
                alt="Feature Background"
              />
              <div className="featureCardContent p-4 text-center text-white">
                <div className="featureCardIcon mb-3">
                  <i
                    className="fa fa-phone p-3 fs-2 rounded-4 shadow"
                    style={{
                      background: "rgba(255, 255, 255, 0.7)",
                      color: getColor(Card2),
                    }}
                  ></i>
                </div>
                <h3 className="featureCardTitle mb-2">Contact:</h3>
                <a
                  href="tel:+919557623131"
                  className="featureCardText text-light text-decoration-none fs-4 fw-semibold"
                >
                  +91 9557623131
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4 p-2">
            <div
              className="featureCard minHeigth300 align-content-center position-relative rounded overflow-hidden"
              style={{ "--cardColor": getColor(Card3) }}
            >
              <img
                src={img}
                className="position-absolute top-0 start-0 w-100 h-100 featureImg"
                alt="Feature Background"
              />
              <div className="featureCardContent p-4 text-center text-white">
                <div className="featureCardIcon mb-3">
                  <a href="http://youtube.com" target="_blank" rel="noreferrer">
                    <i
                      className="fa socialIcons fa-youtube me-2 p-3 fs-2 rounded-4 shadow"
                      style={{
                        background: "rgba(255, 255, 255, 0.7)",
                        color: getColor(Card3),
                      }}
                    ></i>
                  </a>
                  <a
                    href="http://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i
                      className="fa socialIcons fa-instagram me-2 p-3 fs-2 rounded-4 shadow"
                      style={{
                        background: "rgba(255, 255, 255, 0.7)",
                        color: getColor(Card3),
                      }}
                    ></i>
                  </a>

                  <a href="http://twitter.com" target="_blank" rel="noreferrer">
                    <i
                      className="fa socialIcons fa-twitter p-3 fs-2 rounded-4 shadow"
                      style={{
                        background: "rgba(255, 255, 255, 0.7)",
                        color: getColor(Card3),
                      }}
                    ></i>
                  </a>
                </div>
                <h3 className="featureCardTitle mb-2">Follow Us:</h3>
                <h4 className="featureCardText">
                  Connect with us on social media!
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
