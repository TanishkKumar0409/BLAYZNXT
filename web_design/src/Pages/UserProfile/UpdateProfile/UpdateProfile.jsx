import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { API, noFileAPI } from "../../../Services/API/API";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const APIurl = process.env.REACT_APP_API;
  const [profileImage, setProfileImage] = useState(
    `${APIurl}Uploads/Users/DefaultProfiles/DefaultProfile.jpg`
  );
  const { username } = useParams();
  const localUsername = JSON.parse(localStorage.getItem(`user`));
  const [selectedImage, setSelectedImage] = useState(null);

  const redirector = useNavigate();

  useEffect(() => {
    if (username !== localUsername) {
      redirector(`/main/user/update/account/${localUsername}`);
    }
  }, [username, localUsername, redirector]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contact: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      contact: Yup.string()
        .matches(/^\d{10}$/, "Contact must be a valid 10-digit number")
        .required("Contact is required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("contact", values.contact);

        if (selectedImage) {
          formData.append("profile", selectedImage);
        }

        const updateResponse = await API.put(
          `/user/update/${username}`,
          formData
        );

        toast.success(updateResponse.data.message);
        redirector(`/main/user/${username}`);
        window.location.reload();
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.error || "Failed to update profile.");
      }
    },
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await noFileAPI.get(`/user/${username}`);

        if (!selectedImage) {
          setProfileImage(
            `${APIurl}${response.data.profile}` ||
              `${APIurl}Uploads/Users/DefaultProfiles/DefaultProfile.jpg`
          );
        }

        if (
          !formik.values.name &&
          !formik.values.email &&
          !formik.values.contact
        ) {
          formik.setValues({
            name: response.data.name || "",
            email: response.data.email || "",
            contact: response.data.contact || "",
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch user data.");
      }
    };

    getData();
  }, [username, APIurl, formik, selectedImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  return (
    <section className="bgGradient py-5">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 bg-white rounded p-5 shadow mx-auto">
            <h3 className="text-center mb-4 text-dark">Update Account</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="text-center mb-2 mt-4">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="rounded-circle shadow"
                  width="150px"
                  height="150px"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    document.getElementById("image-upload").click()
                  }
                />
                <input
                  type="file"
                  id="image-upload"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="form-group mb-3">
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
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your name"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                ) : null}
              </div>

              <div className="form-group mb-3">
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.contact && formik.errors.contact
                      ? "is-invalid"
                      : ""
                  }`}
                  id="contact"
                  name="contact"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter your contact number"
                />
                {formik.touched.contact && formik.errors.contact ? (
                  <div className="invalid-feedback">
                    {formik.errors.contact}
                  </div>
                ) : null}
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-custom custom-btn">
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
