import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "./ViewComponents/VideoPlayer/VideoPlayer";
import AudioPlayer from "./ViewComponents/AudioPlayer/AudioPlayer";
import { API } from "../../context/API";
import ImageViewer from "./ViewComponents/ImageViewer/ImageViewer";
import PDFViewer from "./ViewComponents/PDFView/PDFView";
import UnknownFileViewer from "./ViewComponents/UnknownView/UnkonwnView";

export default function FileView() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState("");

  const getProfile = useCallback(async () => {
    try {
      const response = await API.get(`/profile`);
      setProfile(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }, []);
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (profile && id) {
        try {
          const response = await API.get(
            `/storage/file/single?username=${profile?.username}&folderId=${id}`
          );
          setData(response.data.file);
        } catch (error) {
          setError(error.response?.data?.error || "Something went wrong");
        }
      }
    };
    getData();
  }, [id, profile]);

  const setRecetFiles = useCallback(async () => {
    if (profile && data) {
      try {
        const response = await API.post(`/storage/recent`, {
          username: profile?.username,
          folderId: data?.folderId,
        });
        console.log(response.data.message);
      } catch (error) {
        console.error(error?.response?.data?.error);
      }
    }
  }, [profile, data]);
  useEffect(() => {
    if (!profile || !data) return; // wait until both are ready

    setRecetFiles();
  }, [profile, data, setRecetFiles]);

  const fileName = data?.root;

  const getFileType = (file) => {
    if (!file) return "unknown";

    const extension = file.split(".").pop().toLowerCase();
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    const videoExtensions = ["mp4", "mov", "avi", "webm", "mkv"];
    const pdfExtensions = ["pdf"];
    const audioExtensions = ["mp3", "wav", "ogg", "flac", "aac"];

    if (imageExtensions.includes(extension)) return "image";
    if (videoExtensions.includes(extension)) return "video";
    if (pdfExtensions.includes(extension)) return "pdf";
    if (audioExtensions.includes(extension)) return "audio";
    return "unknown";
  };
  const fileType = fileName ? getFileType(fileName) : "unknown";

  if (error) {
    return (
      <section className="py-5">
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
      <section>
        {fileType === "image" && <ImageViewer data={data} />}
        {fileType === "video" && <VideoPlayer data={data} />}
        {fileType === "audio" && <AudioPlayer data={data} />}
        {fileType === "pdf" && <PDFViewer data={data} />}
        {fileType === "unknown" && (
          <UnknownFileViewer data={data} userData={profile} />
        )}
      </section>
    </>
  );
}
