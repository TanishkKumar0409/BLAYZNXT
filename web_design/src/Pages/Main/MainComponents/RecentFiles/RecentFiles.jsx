import React, { useEffect, useState } from "react";
import { noFileAPI } from "../../../../Services/API/API";
import { Link } from "react-router-dom";

export default function RecentFiles() {
  const username = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState([]);
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await noFileAPI.get(`/storage/recent/${username}`);
        setData(response.data.recentFiles);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };
    getData();
  }, [username]);

  useEffect(() => {
    const getFiles = async () => {
      try {
        if (data.length > 0) {
          const files = await Promise.all(
            data.slice(0, 6).map(async (element) => {
              const response = await noFileAPI.get(
                `/storage/file/single?username=${username}&folderId=${element.folderId}`
              );
              return response.data;
            })
          );
          setFileData(files);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFiles();
  }, [data, username]);

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();

    const iconMap = {
      jpg: "fa-file-image",
      jpeg: "fa-file-image",
      png: "fa-file-image",
      gif: "fa-file-image",
      pdf: "fa-file-pdf",
      doc: "fa-file-word",
      docx: "fa-file-word",
      xls: "fa-file-excel",
      xlsx: "fa-file-excel",
      ppt: "fa-file-powerpoint",
      pptx: "fa-file-powerpoint",
      txt: "fa-file-alt",
      rar: "fa-file-archive",
      zip: "fa-file-archive",
      mp4: "fa-file-video",
      mkv: "fa-file-video",
      mp3: "fa-file-audio",
      wav: "fa-file-audio",
      ogg: "fa-file-audio",
      flac: "fa-file-audio",
    };

    return iconMap[extension] || "fa-file-circle-exclamation";
  };

  return (
    <>
      {fileData.length > 0 ? (
        <section>
          <div className="container py-5 mt-5">
            <div className="row textDeep">
              <h2
                className="text-center mb-4 mainHeading text-uppercase fw-bold"
                style={{ "--text": "'Recent Files'" }}
              >
                Recent Files
              </h2>
              <p className="px-5 text-center">
                Stay updated with the latest documents and resources in the
                Recent Files section, making it easy to access and manage your
                most relevant files.
              </p>
              <div className="col-12 mt-3">
                <div className="row g-4 justify-content-center">
                  {fileData.map((item, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card border-0 shadow-sm rounded-lg h-100">
                        <div className="card-header bg-transparent text-center py-4 align-content-center">
                          <i
                            className={`fa ${getFileIcon(
                              item.file.root || "default"
                            )} text-white bg-deep rounded p-3 fs-2`}
                          ></i>
                        </div>
                        <div className="card-body textDeep text-center align-content-center">
                          <Link
                            to={`/main/file/view/${item.file.folderId}`}
                            className="btn textDeep fw-bold forgotBtn border-0 overflow-hidden"
                          >
                            {item.file.root}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
