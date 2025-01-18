import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../../../../Services/API/API.js";
import BannerValidationSchema from "../../../../../Helper/ValidationSchemas/ValidationSchema.js";

export default function DragAndDropBox(props) {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const username = JSON.parse(localStorage.getItem("user"));
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
    multiple: true,
  });

  const initialValues = {
    email: userInfo?.email || "",
    message: userInfo?.message || "",
  };

  const handleSubmit = async (values) => {
    setErrorMessage("");

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("email", values.email);
      formData.append("message", values.message || "No message provided");

      const response = await API.post(`/share/${username}`, formData);

      console.log("Form submitted successfully:", response);
      toast.success(response.data.message);
      props.onSend();

      setFiles([]);
      localStorage.removeItem("userInfo");
    } catch (error) {
      setErrorMessage(error.response.data.error);
      toast.error(error.response.data.error);
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: BannerValidationSchema(),
    onSubmit: handleSubmit,
  });

  return (
    <div className="container-fluid py-5">
      <div className="bg-white text-dark p-md-5 p-3 rounded shadow form-box position-relative overflow-hidden">
        <form onSubmit={formik.handleSubmit}>
          <div
            {...getRootProps()}
            className="dropzone cursorPointer bg-white position-relative align-content-center rounded text-center p-5 border-dashed-1 overflow-hidden"
          >
            <input {...getInputProps()} />
            <p className="text-muted">
              Drag and drop {files.length ? "more" : "a"} files here or
              <span className="text-primary fw-bold ms-1">click</span> to select
              files
            </p>
          </div>

          {formik.errors.files && formik.touched.files && (
            <div className="text-danger mt-2">{formik.errors.files}</div>
          )}

          {files.length > 0 && (
            <div className="mt-3">
              <strong className="selected fs-4">
                Selected Files: <span>{files.length}</span>
              </strong>
              <ul
                className="list-group mt-2"
                style={{ maxHeight: "70px", overflow: "auto" }}
              >
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center shadow-sm"
                  >
                    <span className="truncated-file-name">{file.name}</span>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        const updatedFiles = files.filter(
                          (_, i) => i !== index
                        );
                        setFiles(updatedFiles);
                      }}
                    >
                      <i className="fa fa-x"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="row mt-4">
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter Receiver Email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger text-start">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="col-md-6">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                placeholder="Enter your message"
                rows="1"
                maxLength={"500"}
                value={formik.values.message}
                onChange={formik.handleChange}
              />
            </div>
          </div>

          {errorMessage && (
            <div className="text-danger mt-3">{errorMessage}</div>
          )}

          <div className="mt-4 text-center">
            <button
              type="submit"
              className="btn custom-btn btn-custom border-0 overflow-hidden"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
