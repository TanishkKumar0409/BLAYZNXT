import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { noFileAPI } from "../../Services/API/API";

export default function Footer() {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const [isForm, setIsForm] = useState("");

  useEffect(() => {
    if (location.pathname === "/form") {
      setIsForm("d-none");
    } else {
      setIsForm("");
    }
  }, [location]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await noFileAPI.post("/user/newsletter", {
        email,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setEmail("");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const loginToken = localStorage.getItem("loginToken");
  const navLinks = loginToken
    ? [
        { to: "/main", label: "Home" },
        { to: "/main/history", label: "History" },
        { to: "/main/storage", label: "Storage" },
        { to: "/contact", label: "Contact" },
        { to: "/contact", label: "Terms and Conditions" },
        { to: "/contact", label: "Privacy Policy" },
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/contact", label: "Contact" },
      ];

  const socialLinks = ["facebook", "instagram", "youtube"];

  return (
    <footer className={`py-5 ${isForm}`}>
      <div className="container">
        <div className="row mb-4 gy-4 ">
          <div className="col-md-3 text-center align-content-center">
            <Link to="/">
              <img
                src="https://img.pikbest.com/png-images/20241027/eagle-shield-emblem-logo_11012401.png!bw700"
                alt="Logo"
                className="img-fluid mb-3"
                style={{ width: "150px" }}
              />
            </Link>
            <div className="d-flex justify-content-center">
              {socialLinks.map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com`}
                  className="textDeep mx-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fa-brands fa-${platform} fs-4`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="col-md-3">
            <h5 className="fw-bold mb-3 textDeep">Navigation</h5>
            <ul className="list-unstyled">
              {navLinks.map((link, index) => (
                <li key={index} className="mb-2 footer-nav-link">
                  <Link to={link.to} className="textDeep text-decoration-none">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className="fw-bold mb-3 textDeep">Contact Us</h5>
            <p className="mb-1 fw-semibold textDeep">Email:</p>
            <a
              href="mailto:tanishkk60@gmail.com"
              className="textDeep text-decoration-none mb-3 d-block"
            >
              tanishkk60@gmail.com
            </a>
            <p className="mb-1 fw-semibold textDeep">Contact:</p>
            <a
              href="tel:95576213131"
              className="textDeep text-decoration-none mb-3 d-block"
            >
              95576213131
            </a>
          </div>

          <div className="col-md-3">
            <div className="p-4 rounded border-deep">
              <h5 className="fw-bold fs-6 text-center textDeep mb-3">
                Subscribe to our Newsletter
              </h5>
              <p className="text-center textDeep mb-4 fs-6">
                Stay updated with the latest news and exclusive offers.
              </p>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control border-deep"
                    placeholder="Enter your email"
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-deep border-1"
                    type="submit"
                  >
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            <hr />
            <p className="mb-0 textDeep">
              &copy; {new Date().getFullYear()}{" "}
              <Link to={`/`} className="fw-bold text-decoration-none">
                ProjectTK
              </Link>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
