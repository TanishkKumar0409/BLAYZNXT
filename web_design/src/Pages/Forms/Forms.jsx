import React, { useState } from "react";
import Register from "./Register/Register";
import Login from "./Login/Login";

export default function Forms() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <section className="modalBg-1 blurBg-1">
      <div className="container-fluid">
        <div
          className={`row ${
            isLogin ? "vh-100" : "py-4"
          } position-relative align-items-center justify-content-center`}
        >
          <div className="col-md-6 bg-white rounded">
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
