import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginValidationSchema } from "../../../Helper/FormValidationSchemas/FormValidationSchemas";
import { noFileAPI } from "../../../Services/API/API";

export default function Login(props) {
  const redirector = useNavigate();
  const username = JSON.parse(localStorage.getItem(`user`));
  const initialValues = { email: "", password: "" };

  const handleSubmit = async (values) => {
    try {
      const response = await noFileAPI.post("/user/login", values);

      toast.success(response.data.message);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.loginUser.username)
      );

      localStorage.setItem("loginToken", response.data.loginToken);
      if (response.data.adminToken) {
        localStorage.setItem("adminToken", response.data.adminToken);
      }

      window.location.reload();

      redirector("/");
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginValidationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="d-flex justify-content-center align-items-center my-5 w-100">
      <div className="w-100 px-5">
        <h3 className="text-center mb-4">
          Login to{" "}
          <Link
            to={`/`}
            className="textDeep forgotBtn fw-bold text-decoration-none"
          >
            Project TK
          </Link>
        </h3>
        <hr />
        <form onSubmit={formik.handleSubmit} className="form-style textDeep fw-bold">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control border-deep"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              autoComplete="email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-danger">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control border-deep"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>
          <div className="mb-3 text-end">
            <Link
              to={`/main/user/account/password/${username || "forgot"}`}
              className="forgotBtn text-decoration-none textDeep"
            >
              Forgot Password
            </Link>
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-deep"
              disabled={formik.isSubmitting}
            >
              Login
            </button>
          </div>
          <p className="text-center fw-normal mt-3">
            Don't have an account?{" "}
            <Link
              className="forgotBtn fw-bold text-decoration-none textDeep"
              onClick={props.isLogin}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
