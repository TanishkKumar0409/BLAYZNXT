import React, { useState, useRef } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { RegisterValidationSchema } from "../../../Helper/FormValidationSchemas/FormValidationSchemas";
import { API } from "../../../Services/API/API";
import { toast } from "react-toastify";

export default function Register(props) {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const redirector = useNavigate();

  const APIurl = process.env.REACT_APP_API;

  const initialValues = {
    username: "",
    name: "",
    email: "",
    contact: "",
    password: "",
    profile: null,
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("contact", values.contact);
      formData.append("password", values.password);

      if (values.profile) {
        formData.append("profile", values.profile);
      }

      const response = await API.post("/user/register", formData);

      toast.success(response.data.message);

      const regiseteredUsername = response.data.loginUser.username;

      localStorage.setItem("loginToken", response.data.loginToken);
      localStorage.setItem("user", JSON.stringify(regiseteredUsername));

      redirector(`/verify/${regiseteredUsername}`);

      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: RegisterValidationSchema,
    onSubmit: handleSubmit,
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      formik.setFieldValue("profile", file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className={`w-100 rounded bg-white px-md-4`}>
        <h3 className="text-center my-4">
          Login to{" "}
          <Link
            to={`/`}
            className="textDeep forgotBtn fw-bold text-decoration-none"
          >
            Project TK
          </Link>
        </h3>
        <hr />
        <form
          onSubmit={formik.handleSubmit}
          className="form-style textDeep fw-bold"
        >
          <div className="mb-3 text-center">
            <input
              ref={fileInputRef}
              type="file"
              className="form-control d-none"
              id="profile"
              name="profile"
              onChange={handleImageChange}
              accept="image/*"
            />
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="profile-preview position-relative d-flex justify-content-center align-items-center"
                style={{ width: "100px", height: "100px" }}
              >
                <img
                  src={
                    profileImage ||
                    `${APIurl}Uploads/Users/DefaultProfiles/DefaultProfile.jpg`
                  }
                  onClick={handleImageClick}
                  alt="Profile Preview"
                  className="img-fluid rounded cursorPointer"
                  style={{ objectFit: "cover" }}
                />
                <i
                  className="fa fa-pen text-white modalBg-1 position-absolute bottom-0 end-0 fs-6 cursorPointer rounded p-2"
                  onClick={handleImageClick}
                ></i>
              </div>
            </div>

            <label
              htmlFor="profile"
              className="form-label fs-5 m-0 cursorPointer"
            >
              Profile Picture
            </label>
            {formik.touched.profile && formik.errors.profile && (
              <div className="text-danger">{formik.errors.profile}</div>
            )}
          </div>

          <div className="row">
            <div className="col-md-6 mb-1">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control border-deep ${
                  formik.touched.username &&
                  formik.errors.username &&
                  "is-invalid"
                }`}
                placeholder="Enter a Unique Username"
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="username"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-danger">{formik.errors.username}</div>
              )}
            </div>

            <div className="col-md-6 mb-1">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className={`form-control border-deep ${
                  formik.touched.name && formik.errors.name && "is-invalid"
                }`}
                placeholder="Enter Your Full Name"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-1">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                className={`form-control border-deep ${
                  formik.touched.email && formik.errors.email && "is-invalid"
                }`}
                placeholder="Enter Your Email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            <div className="col-md-6 mb-1">
              <label htmlFor="contact" className="form-label">
                Contact Number
              </label>
              <input
                type="tel"
                className={`form-control border-deep ${
                  formik.touched.contact &&
                  formik.errors.contact &&
                  "is-invalid"
                }`}
                placeholder="Enter Your Contact Number"
                id="contact"
                name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger">{formik.errors.contact}</div>
              )}
            </div>
          </div>

          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a Strong Password"
              className={`form-control border-deep ${
                formik.touched.password &&
                formik.errors.password &&
                "is-invalid"
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-danger">{formik.errors.password}</div>
            )}
          </div>

          <div className="d-grid mt-2">
            <button
              type="submit"
              className="btn btn-deep"
              disabled={formik.isSubmitting}
            >
              Submit
            </button>
          </div>

          <p className="text-center fw-normal mt-1">
            Already have an account?{" "}
            <Link
              className="forgotBtn fw-bold text-decoration-none textDeep"
              onClick={props.isLogin}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
