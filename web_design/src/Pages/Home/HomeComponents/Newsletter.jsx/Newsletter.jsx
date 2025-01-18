import React, { useState } from "react";
import { toast } from "react-toastify";
import { noFileAPI } from "../../../../Services/API/API";

export default function Newsletter() {
  const [newsEmail, setNewsEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newsEmail) {
      setErrorMessage("Email is required");
      toast.error("Email is required");
      return;
    }

    const newsData = {
      email: newsEmail,
    };

    try {
      const response = await noFileAPI.post("/user/newsletter", newsData);

      if (response.status === 200 || response.data.success) {
        toast.success(response.data.message);
        setNewsEmail("");
        setErrorMessage("");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <section className="bg-light py-5">
        <div className="container">
          <div className="row text-center mb-4">
            <div className="col">
              <h2 className="fw-bold">Subscribe to Our Newsletter</h2>
              <p className="text-muted">
                Stay updated with the latest news and special offers!
              </p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control border-0 shadow-sm"
                    placeholder="Enter your email address"
                    aria-label="Email"
                    id="newsletter"
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                  />
                  <button className="btn btn-custom custom-btn">
                    Subscribe
                  </button>
                </div>
                {errorMessage && (
                  <div className="text-danger mt-3">{errorMessage}</div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
