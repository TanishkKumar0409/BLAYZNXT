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
      <div className="p-md-5 p-3 rounded shadow-sm border-deep">
        <form onSubmit={handleSubmit}>
          <div
            {...getRootProps()}
            onClick={() => setShowModal(true)}
            className="dropzone cursorPointer position-relative align-content-center rounded text-center border-2 p-5"
          >
            <input {...getInputProps()} />
            <p className="textDeep">
              Drag and drop {files.length ? "more" : "a"} files here or
              <span className="fw-bold ms-1">click</span> to select files
            </p>
          </div>

          <div className="row mt-4 flex-column">
            <div className="col mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control border-deep"
                placeholder="Enter Receiver Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form-control border-deep"
                placeholder="Enter your message (Optional)"
                rows="3"
                maxLength={"500"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <small id="messageHelp" class="form-text textDeep">
                Max <strong>500</strong> characters allowed.
              </small>
            </div>
          </div>

          {errorMessage && (
            <div className="text-danger mt-3">{errorMessage}</div>
          )}

          <div className="mt-4 text-center">
            <button type="submit" className="btn btn-deep w-100">
              Submit
            </button>
          </div>
        </form>
      </div>

      <div
        className={`modal fade ${
          showModal ? "show d-block" : ""
        } blurBg-1 modalBg-1`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content border-0 p-3">
            <div className="modal-header border-0 p-0 justify-content-center">
              <h5 className="modal-title text-center textDeep fs-2 m-0 fw-bold">
                Please Login
              </h5>
            </div>

            <div className="modal-body text-center">
              <p className="m-0 fs-6 textDeepBlue">
                You need to log in to continue.
              </p>
            </div>

            <div className="modal-footer p-0 justify-content-center border-0">
              <Link to="/form" className="btn btn-deep">
                Login
              </Link>
              <button
                type="button"
                className="btn btn-outline-deep"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
