import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageView from "./ViewExt.jsx/ImageView";
import VideoView from "./ViewExt.jsx/VideoView";
import PdfView from "./ViewExt.jsx/PdfView";
import { noFileAPI } from "../../Services/API/API";
import DocView from "./ViewExt.jsx/DocView";
import AudioView from "./ViewExt.jsx/AudioView";

export default function FileView() {
  const username = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await noFileAPI.get(
          `/storage/file/single?username=${username}&folderId=${id}`
        );
        setData(response.data.file);
      } catch (error) {
        setError(error.response?.data?.error || "Something went wrong");
      }
    };
    getData();
  }, [id, username]);

  const fileName = data?.root;

  const getFileType = (file) => {
    if (!file) return "unknown";

    const extension = file.split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const videoExtensions = ["mp4", "mov", "avi", "webm", "mkv"];
    const pdfExtensions = ["pdf"];
    const audioExtensions = ["mp3", "wav", "ogg", "flac", "aac"];
    const docExtension = ["doc", "docx", "xlsx", "pptx"];

    if (imageExtensions.includes(extension)) return "image";
    if (videoExtensions.includes(extension)) return "video";
    if (pdfExtensions.includes(extension)) return "pdf";
    if (docExtension.includes(extension)) return "doc";
    if (audioExtensions.includes(extension)) return "audio";
    return "unknown";
  };

  const fileType = fileName ? getFileType(fileName) : "unknown";

  if (error) {
    return (
      <section className="bgGradient py-5">
        <div className="container">
          <div className="row">
            <div className="col text-center py-md-5 pt-5">
              <p className="text-danger">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bgGradient py-5">
        <div className="container">
          <div className="row">
            <div className="col text-center py-md-5 pt-5">
              {fileType === "image" && <ImageView data={data} />}
              {fileType === "video" && <VideoView data={data} />}
              {fileType === "pdf" && <PdfView data={data} />}
              {fileType === "doc" && <DocView data={data} />}
              {fileType === "audio" && <AudioView data={data} />}
              {fileType === "unknown" && <p>Unsupported file type</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
