import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { noFileAPI } from "../../../Services/API/API";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [step, setStep] = useState(1);
  const [timer, setTimer] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const redirector = useNavigate();

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      toast.info("OTP Has Been Expired");
      redirector("/main");
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer, redirector]);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      otp:
        step === 2
          ? Yup.string()
              .length(4, "OTP must be 4 digits")
              .required("OTP is required")
          : Yup.string(),
      password:
        step === 2
          ? Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Required")
          : Yup.string(),
      confirmPassword:
        step === 2
          ? Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Confirm password is required")
          : Yup.string(),
    }),
    onSubmit: async (values) => {
      if (step === 1) {
        setIsLoading(true);
        try {
          const response = await noFileAPI.post("/user/change/password/otp", {
            email: values.email,
          });
          if (response.status === 200) {
            setStep(2);
            setIsTimerActive(true);
            toast.success(response.data.message);
            setApiError("");
          }
        } catch (error) {
          setApiError(error.response.data.error);
          toast.error(error.response.data.error);
        } finally {
          setIsLoading(false);
        }
      } else if (step === 2) {
        try {
          const response = await noFileAPI.put("/user/change/password", {
            email: values.email,
            otp: values.otp,
            password: values.password,
          });
          if (response) {
            if (response.data.loginToken) {
              localStorage.setItem(
                "user",
                JSON.stringify(response.data.changedPassword.username)
              );

              localStorage.setItem("loginToken", response.data.loginToken);

              if (response.data.adminToken) {
                localStorage.setItem("adminToken", response.data.adminToken);
              }
            }

            toast.success(response.data.message);
            setApiError("");

            redirector("/");

            window.location.reload();
          }
        } catch (error) {
          setApiError(error.response.data.error);
          toast.error(error.response.data.error);
        }
      }
    },
  });

  return (
    <section>
      <div className="container mt-5 align-content-center">
        <div className="row">
          <div className="col-md-6 p-5 shadow-sm textDeep rounded mx-auto">
            <h3 className="text-center">
              {step === 1
                ? "Enter Your Email"
                : "Verify OTP and Set New Password"}
            </h3>
            <p className="text-center mb-4">
              {step === 1
                ? "Please enter your email to receive a password reset OTP."
                : "Enter the OTP sent to your email and set your new password."}
            </p>
            {apiError && <div className="text-danger mb-3">{apiError}</div>}
            <form onSubmit={formik.handleSubmit} className="textDeep fw-bold">
              {step === 1 && (
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control border-deep"
                    placeholder="Enter Your Email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    disabled={isLoading}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </div>
              )}

              {step === 2 && (
                <>
                  <div className="mb-3">
                    <label htmlFor="otp" className="form-label">
                      OTP (4 digits)
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      className="form-control border-deep"
                      placeholder="Enter the Received OTP on Your Email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.otp}
                    />
                    {formik.touched.otp && formik.errors.otp && (
                      <div className="text-danger">{formik.errors.otp}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control border-deep"
                      placeholder="Enter New Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control border-deep"
                      placeholder="Re-Enter the Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <div className="text-danger">
                          {formik.errors.confirmPassword}
                        </div>
                      )}
                    <div className="mt-2 fw-normal text-end">
                      Time remaining:{" "}
                      <span className="text-danger fw-bold">
                        {Math.floor(timer / 60)}:{timer % 60 < 10 ? "0" : ""}
                        {timer % 60}
                      </span>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="btn btn-deep w-100"
                disabled={isLoading}
              >
                {isLoading
                  ? "Sending..."
                  : step === 1
                  ? "Submit Email"
                  : "Submit OTP and Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
