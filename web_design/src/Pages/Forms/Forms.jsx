import React, { useState } from "react";
import Register from "./Register/Register";
import Login from "./Login/Login";

export default function Forms() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <section
      className="contactBanner align-content-center"
      style={{ minHeight: "92vh" }}
    >
      <div className="container-fluid">
        <div
          className={`row ${
            isLogin ? "py-5" : "py-0"
          } position-relative align-items-center justify-content-center`}
        >
          <div className="col-md-6 rounded p-0">
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
