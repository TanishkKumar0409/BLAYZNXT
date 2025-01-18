import React, { useState } from "react";
import Register from "./Register/Register";
import { Link } from "react-router-dom";
import Login from "./Login/Login";

export default function Forms() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <section>
      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-md-6 bgGradient py-md-0 py-5 d-flex justify-content-center align-items-center text-center">
            <Link to="/">
              <img
                src="https://img.pikbest.com/png-images/20241027/eagle-shield-emblem-logo_11012401.png!bw700"
                className="img-fluid fa-bounce logo-animation"
                width="250px"
                alt="Logo"
              />
              <h2 className="text-light fs-1 fw-bold text-decoration-underline mt-4">
                Project TK
              </h2>
            </Link>
          </div>

          <div className="col-md-6 d-flex justify-content-center align-items-center">
            {isLogin ? (
              <Login isLogin={toggleForm} />
            ) : (
              <Register isLogin={toggleForm} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
