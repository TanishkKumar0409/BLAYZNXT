import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../../../../Services/API/API";

export default function DownloadLink() {
  const [data, setData] = useState(null);
  const username = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await API.get(`/share/history/downloader/${username}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch download link.");
      }
    };
    getData();
  }, [username]);

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  if (!data) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="container-fluid py-5">
      <div className="bg-white text-dark p-md-5 p-3 rounded shadow form-box position-relative overflow-hidden">
        <h3
          className="text-center mb-4 mainHeading text-uppercase fw-bold"
          style={{ "--text": "'Download Link'" }}
        >
          Download Link
        </h3>

        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <Link className="text-truncate">{data.downloadLink}</Link>
            <button
              className="btn btn-light"
              onClick={() => handleCopy(data.downloadLink)}
            >
              <i className="fa fa-copy"></i>
            </button>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <p className="text-center fs-6">
              Send To: <strong>{data.receiverEmail}</strong>
            </p>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <p className="text-center fs-6">
              Total Files Shared: <strong>{data.fileName.length}</strong>
            </p>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <p className="text-center fs-6">
              Link will expire on{" "}
              {new Date(data.downloadLinkExpiry).toLocaleString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
