import React, { useState } from "react";
import { useFormik } from "formik";
import { ContactUsSchema } from "../../../Helper/FormValidationSchemas/FormValidationSchemas";
import { toast } from "react-toastify";
import { noFileAPI } from "../../../Services/API/API";
import { useNavigate } from "react-router-dom";

export default function ContactForm() {
  const redirector = useNavigate();
  const [isHoverd, setIsHovered] = useState("w-50");

  const initialValues = {
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await noFileAPI.post("/user/contact", values);
      toast.success(response.data.message);
      redirector("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ContactUsSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <section className="py-5">
        <div className="container">
          <h2
            className="text-center mb-4 mainHeading text-uppercase fw-bold"
            style={{ "--text": "'Contact Us'" }}
          >
            Contact Us
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-6 bg-white rounded p-5 shadow-sm form-box overflow-hidden position-relative">
              <form onSubmit={formik.handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.name && formik.errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      {...formik.getFieldProps("name")}
                      autoComplete="name"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      {...formik.getFieldProps("email")}
                      autoComplete="email"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="contact" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${
                        formik.touched.contact && formik.errors.contact
                          ? "is-invalid"
                          : ""
                      }`}
                      id="contact"
                      name="contact"
                      placeholder="Enter your contact number"
                      {...formik.getFieldProps("contact")}
                    />
                    {formik.touched.contact && formik.errors.contact && (
                      <div className="invalid-feedback">
                        {formik.errors.contact}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="subject" className="form-label">
                      Subject
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.subject && formik.errors.subject
                          ? "is-invalid"
                          : ""
                      }`}
                      id="subject"
                      name="subject"
                      placeholder="Enter the subject"
                      {...formik.getFieldProps("subject")}
                    />
                    {formik.touched.subject && formik.errors.subject && (
                      <div className="invalid-feedback">
                        {formik.errors.subject}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    className={`form-control ${
                      formik.touched.message && formik.errors.message
                        ? "is-invalid"
                        : ""
                    }`}
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Enter your message"
                    {...formik.getFieldProps("message")}
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <div className="invalid-feedback">
                      {formik.errors.message}
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className={`btn btn-custom custom-btn ${isHoverd}`}
                    onMouseOver={() => setIsHovered("w-100")}
                    onMouseOut={() => setIsHovered("w-50")}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
