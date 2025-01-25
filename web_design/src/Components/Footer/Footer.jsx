import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { noFileAPI } from "../../Services/API/API";

export default function Footer() {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const [isForm, setIsForm] = useState("");
  const username = JSON.parse(localStorage.getItem(`user`));
  const [scrollBtn, setScrollBtn] = useState("");
  const [newError, setNewsError] = useState("");

  const noFooter = useMemo(
    () => [
      "/form",
      `/main/user/delete/account/${username}`,
      `/main/user/account/password/${username}`,
      `/verify/send/${username}`,
      `/verify/${username}`,
    ],
    [username]
  );

  useEffect(() => {
    if (noFooter.includes(location.pathname)) {
      setIsForm("d-none");
    } else {
      setIsForm("");
    }
  }, [location, noFooter]);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

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
      setNewsError(error.response.data.error);
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

  useEffect(() => {
    const handleScoller = () => {
      const scrolled = window.scrollY;
      if (scrolled > 100) {
        setScrollBtn("");
      } else {
        setScrollBtn("d-none");
      }
    };
    handleScoller();
    window.addEventListener("scroll", handleScoller);
  }, []);

  return (
    <footer className={`py-5 ${isForm} bg-light position-relative`}>
      <button
        className={`btn btn-deep ${scrollBtn} position-fixed m-2 bottom-0 end-0`}
        style={{ zIndex: 99 }}
        onClick={() => window.scrollTo(0, 0)}
      >
        <i className="fa fa-arrow-up"></i>
      </button>
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
                  className="textDeep socialIcons mx-2"
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
              className="textDeep text-decoration-none mb-3 footer-nav-link d-block"
            >
              tanishkk60@gmail.com
            </a>
            <p className="mb-1 fw-semibold textDeep">Contact:</p>
            <a
              href="tel:95576213131"
              className="textDeep text-decoration-none footer-nav-link mb-3 d-block"
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
                    id="newsletter"
                    type="email"
                    className={`form-control border-deep ${
                      newError ? "is-invalid" : ""
                    } `}
                    placeholder="Enter your email"
                    aria-label="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setNewsError("");
                    }}
                  />
                  <button
                    className="btn btn-outline-deep border-1"
                    type="submit"
                  >
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </div>
                <p className="text-danger">{newError}</p>
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
