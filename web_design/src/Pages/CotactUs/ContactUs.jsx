import React from "react";
import InnerPagesBanner from "../../Components/InnerPagesBanner/InnerPagesBanner";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ContactUsSchema } from "../../Helper/FormValidationSchemas/FormValidationSchemas";
import { noFileAPI } from "../../Services/API/API";

export default function ContactUs() {
  const redirector = useNavigate();

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
      <InnerPagesBanner heading={`Contact Us`} />
      <section className="py-5 contactBanner">
        <div className="container">
          <div className="row justify-content-center text-white">
            <div className="col-md-6">
              <div className="p-3 h-100 align-content-center">
                <div className="row">
                  <div>
                    <h2 className="display-6 fw-bold">
                      We’d Love to Hear From You!
                    </h2>
                    <p className="fw-semibold fs-5 textJustify">
                      Have any questions, feedback, or need support? Reach out
                      to us, and we’ll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
                <div className="row textDeep">
                  <div className="d-flex col-md-6 pe-1 align-items-center">
                    <div className="bg-white rounded d-flex p-2 w-100">
                      <i className="fa fa-envelope fs-3 mx-2 me-3 align-content-center"></i>
                      <div>
                        <h5 className="mb-1 fs-5 fw-bold">Email</h5>
                        <a
                          href="mailto:Tanishkk60@gmail.com"
                          className="mb-0 fs-6 fw-semibold cursorPointer forgotBtn text-decoration-none textDeep"
                        >
                          Tanishkk60@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex col-md-6 ps-1 align-items-center">
                    <div className="bg-white rounded d-flex p-2 w-100">
                      <i className="fa fa-phone fs-3 mx-2 me-3 align-content-center"></i>
                      <div>
                        <h5 className="mb-1 fs-5  fw-bold">Contact</h5>
                        <a
                          href="tel:9557623131"
                          className="mb-0 fs-6 fw-semibold cursorPointer forgotBtn text-decoration-none textDeep"
                        >
                          +91 9557623131
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex  bg-white p-2 rounded justify-content-center my-2">
                  <a
                    href="https://www.facebook.com"
                    className="mx-4 socialIcons fs-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="https://www.instagram.com"
                    className="mx-4 socialIcons fs-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.youtube.com"
                    className="mx-4 socialIcons fs-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-6 bg-white rounded p-3">
              <h2 className="textDeep fw-bold text-center fs-1">Contact Us</h2>
              <form onSubmit={formik.handleSubmit} className="textDeep fw-bold">
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
                      } border-deep`}
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
                      } border-deep`}
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
                      } border-deep`}
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
                      } border-deep`}
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
                    } border-deep`}
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
                  <button type="submit" className={`btn btn-deep w-100`}>
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
