import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function HomeDrag() {
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
    multiple: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Email is required");
      toast.error("Email is required");
      return;
    }

    setShowModal(true);

    setFiles([]);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container-fluid py-5">
      <div className="bg-white text-dark p-md-5 p-3 rounded shadow form-box position-relative overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div
            {...getRootProps()}
            onClick={() => setShowModal(true)}
            className="dropzone cursorPointer bg-white position-relative align-content-center rounded text-center p-5 border-dashed-1 overflow-hidden"
          >
            <input {...getInputProps()} />
            <p className="text-muted">
              Drag and drop {files.length ? "more" : "a"} files here or
              <span className="text-primary fw-bold ms-1">click</span> to select
              files
            </p>
          </div>

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
                className="form-control"
                placeholder="Enter Receiver Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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

      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Please Login</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>You need to login to continue.</p>
              <Link to={`form`} className="btn btn-custom custom-btn">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
