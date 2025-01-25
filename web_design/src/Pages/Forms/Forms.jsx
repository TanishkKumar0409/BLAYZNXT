import React, { useState } from "react";
import Register from "./Register/Register";
import Login from "./Login/Login";

export default function Forms() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <section className="othersBanner align-content-center py-4">
      <div className="container-fluid">
        <div className={`row align-items-center justify-content-center`}>
          <div className="col-md-6 text-white p-4">
            <h2 className="display-2 fw-bold mb-4">
              {isLogin ? "Welcome Back!" : "Create Your Account"}
            </h2>
            <p className="fs-3 fw-semibold textJustify">
              {isLogin
                ? "Log in to access your dashboard and explore our features tailored just for you."
                : "Sign up today to unlock all the benefits and features we offer. Your journey starts here!"}
            </p>
            <button
              className="btn btn-light mt-3 btn-lg textDeep btn-lg mt-4 fw-semibold"
              onClick={toggleForm}
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
          <div className="col-md-6 rounded p-4">
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
