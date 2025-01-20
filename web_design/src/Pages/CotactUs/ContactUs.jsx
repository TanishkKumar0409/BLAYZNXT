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
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 textDeep" style={{ minHeight: "400px" }}>
              <div className="info p-4 bg-white rounded shadow-sm h-100 align-content-center">
                <div className="d-flex align-items-center my-5">
                  <i className="fa fa-envelope fs-1  me-5"></i>
                  <div>
                    <h5 className="mb-1 fs-4 fw-bold">Email</h5>
                    <p className="mb-0 fs-4">Tanishkk60@gmail.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center my-5">
                  <i className="fa fa-phone fs-1 me-5"></i>
                  <div>
                    <h5 className="mb-1 fs-4  fw-bold">Contact</h5>
                    <p className="mb-0 fs-4">+91 9557623131</p>
                  </div>
                </div>

                <div className="d-flex justify-content-center my-5">
                  <a
                    href="https://www.facebook.com"
                    className="btn mx-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a
                    href="https://www.instagram.com"
                    className="btn mx-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.youtube.com"
                    className="btn mx-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 bg-white rounded p-3 shadow-sm"
              style={{ minHeight: "400px" }}
            >
              <form onSubmit={formik.handleSubmit} className="textDeep fw-bold">
                <div className="row mb-3 ">
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
