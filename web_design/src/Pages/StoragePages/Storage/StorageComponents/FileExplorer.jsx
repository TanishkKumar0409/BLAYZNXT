import React, { useCallback, useEffect, useState } from "react";
import CreateFolderModal from "./ConfirmationModals/CreateFolderModal";
import ConfirmDeleteModal from "./ConfirmationModals/ConfirmDeleteModal";
import { noFileAPI } from "../../../../Services/API/API";
import { API } from "../../../../Services/API/API";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function FileExplorer({ username }) {
  const [folderData, setFolderData] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(1);
  const [folderStack, setFolderStack] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [isHover, setIsHover] = useState("");
  const redirector = useNavigate();

  const getData = useCallback(async () => {
    try {
      const response = await noFileAPI.get(`storage/folder/${username}`);
      setFolderData(response.data);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, [username]);

  useEffect(() => {
    getData();
  }, [getData]);

  const currentFolder = folderData.find(
    (item) => item.folderId === currentFolderId
  );
  const currentChildren =
    currentFolder?.children.map((id) =>
      folderData.find((item) => item.folderId === id)
    ) || [];

  const handleFolderClick = async (folder) => {
    setSelectedItemId(null);
    if (folder.type === "folder") {
      setFolderStack([...folderStack, currentFolderId]);
      setCurrentFolderId(folder.folderId);
    } else {
      const recentData = {
        username,
        folderId: selectedItemId,
      };

      if (recentData) {
        try {
          const recentResponse = await noFileAPI.post(
            "/storage/recent",
            recentData
          );
          console.log(recentResponse.data.message);
        } catch (error) {
          console.error(error.response.data.error);
        }

        redirector(`/main/file/view/${selectedItemId}`);
      }
    }
  };

  const handleBack = () => {
    const previousFolderId = folderStack.pop();
    setCurrentFolderId(previousFolderId);
    setFolderStack([...folderStack]);
    setSelectedItemId(null);
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    const MAX_TOTAL_SIZE = 1 * 1024 * 1024 * 1024;

    if (!files.length || !currentFolder) {
      toast("No valid folder or files selected.");
      return;
    }

    const totalSize = Array.from(files).reduce(
      (sum, file) => sum + file.size,
      0
    );
    if (totalSize > MAX_TOTAL_SIZE) {
      toast.error("Do not have Enough Space");
      return;
    }

    let successCount = 0;
    const progressArray = [...uploadProgress];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const formData = new FormData();
      formData.append("parentId", currentFolderId);
      formData.append("files", file);

      progressArray[i] = { fileName: file.name, progress: 0 };
      setUploadProgress([...progressArray]);
      console.log(file);

      try {
        const response = await API.post(
          `/storage/file/upload/${username}`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              progressArray[i].progress = percentCompleted;
              setUploadProgress([...progressArray]);
            },
          }
        );

        const uploadedFile = response.data;
        folderData.push(uploadedFile);
        currentFolder.children.push(uploadedFile.id);
        setSelectedItemId(uploadedFile.id);
        setUploadProgress([]);

        successCount++;
      } catch (error) {
        toast.error(error.response?.data?.error);
        setUploadProgress([]);
        console.error(error);
      }
    }

    if (successCount > 0) {
      toast.success(`${successCount} file(s) uploaded successfully`);
    }

    getData();

    event.target.value = "";
  };

  const handleDownload = (fileId) => {
    const APIurl = process.env.REACT_APP_API;
    window.location.href = `${APIurl}api/storage/file/download?username=${username}&folderId=${fileId}`;
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return "fa-file text-info";
    const extension = fileName.split(".").pop().toLowerCase();
    switch (extension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "fa-image textGreen";
      case "pdf":
        return "fa-file-pdf text-danger";
      case "doc":
      case "docx":
        return "fa-file-word text-primary";
      case "xls":
      case "xlsx":
        return "fa-file-excel textDarkGreen";
      case "ppt":
      case "pptx":
        return "fa-file-powerpoint textOrange";
      case "txt":
        return "fa-file-alt text-muted";
      case "zip":
      case "rar":
        return "fa-file-archive text-warning";
      case "mkv":
      case "mp4":
        return "fa-file-video textRoyalBlue";
      case "mp3":
      case "wav":
      case "ogg":
      case "flac":
        return "fa-file-audio textMaroon";
      default:
        return "fa-file text-info";
    }
  };

  let touchCounter = 0;
  let touchTimeout;

  const handleTouchStart = (e, folder) => {
    touchCounter += 1;

    if (touchCounter === 2) {
      clearTimeout(touchTimeout);
      handleFolderClick(folder);
      touchCounter = 0;
    } else {
      touchTimeout = setTimeout(() => {
        touchCounter = 0;
      }, 500);
    }
  };

  return (
    <>
      <section>
        <div className="container py-3">
          <button
            onClick={handleBack}
            className="btn btn-outline-deep shadow-sm mb-4 rounded"
            disabled={folderStack.length === 0}
          >
            <i className="fa fa-arrow-left"></i>
          </button>

          <div className="row mb-4 justify-content-center">
            <div className="col-3 d-flex flex-column align-items-center">
              <div
                className={`box-container ${
                  isHover === "createFolder"
                    ? "bg-deep text-white"
                    : "bg-white textDeep"
                } shadow-sm cursorPointer rounded-3 p-3 text-center textMaroon`}
                onMouseEnter={() => setIsHover("createFolder")}
                onMouseLeave={() => setIsHover("")}
                onClick={() => setIsModalOpen(true)}
              >
                <i className="fa fa-folder-plus fs-4 me-md-2"></i>
                <span className="d-none d-md-inline-block fw-bold">
                  Create Folder
                </span>
              </div>
            </div>

            <div className="col-3 d-flex flex-column align-items-center">
              <label
                className={`box-container ${
                  isHover === "upload"
                    ? "bg-deep text-white"
                    : "bg-white textDeep"
                } shadow-sm cursorPointer rounded-3 p-3 text-center textDarkGreen`}
                onMouseEnter={() => setIsHover("upload")}
                onMouseLeave={() => setIsHover("")}
              >
                <i className="fa fa-upload fs-4 me-md-2"></i>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <span className="d-none d-md-inline-block fw-bold">
                  Upload File
                </span>
              </label>
            </div>

            <div className="col-3 d-flex flex-column align-items-center">
              {selectedItemId && (
                <div
                  className={`box-container ${
                    isHover === "delete"
                      ? "bg-deep text-white"
                      : "bg-white textDeep"
                  } shadow-sm cursorPointer rounded-3 p-3 text-center text-danger`}
                  onClick={() => setIsDeleteModalOpen(true)}
                  onMouseEnter={() => setIsHover("delete")}
                  onMouseLeave={() => setIsHover("")}
                >
                  <i className="fa fa-trash fs-4 me-md-2"></i>
                  <span className="d-none d-md-inline-block fw-bold">
                    Delete
                  </span>
                </div>
              )}
            </div>

            <div className="col-3 d-flex flex-column align-items-center">
              {selectedItemId &&
                folderData.find((item) => item.folderId === selectedItemId)
                  ?.type === "file" && (
                  <div
                    className={`box-container ${
                      isHover === "download"
                        ? "bg-deep text-white"
                        : "bg-white textDeep"
                    } shadow-sm cursorPointer rounded-3 p-3 text-center textRoyalBlue`}
                    onMouseEnter={() => setIsHover("download")}
                    onMouseLeave={() => setIsHover("")}
                    onClick={() => handleDownload(selectedItemId)}
                  >
                    <i className="fa fa-download fs-4 me-md-2"></i>
                    <span className="d-none d-md-inline-block fw-bold">
                      Download
                    </span>
                  </div>
                )}
            </div>
          </div>

          <div className="row">
            {currentChildren.length > 0 ? (
              currentChildren.map((child, index) => (
                <div
                  className="col-6 col-md-3 d-flex flex-column align-items-center mb-4 text-"
                  key={index}
                >
                  <div
                    className={`icon-container cursorPointer ${
                      selectedItemId === child.folderId
                        ? "bg-light border-deep"
                        : "bg-white shadow-sm"
                    } rounded-3 d-flex justify-content-center align-items-center`}
                    onDoubleClick={() => handleFolderClick(child)}
                    onTouchStart={(e) => handleTouchStart(e, child)}
                    onClick={() => setSelectedItemId(child.folderId)}
                    style={{
                      width: "100px",
                      height: "100px",
                    }}
                  >
                    <i
                      style={{ fontSize: "5rem" }}
                      className={`fa fw-bold ${
                        child.type === "folder"
                          ? "fa-folder text-warning"
                          : getFileIcon(child?.root)
                      }`}
                    ></i>
                  </div>
                  <span className="folder-name mt-2">{child.root}</span>
                </div>
              ))
            ) : (
              <h5 className="text-center">
                {currentFolder ? "No items in this folder." : "Loading..."}
              </h5>
            )}
          </div>

          <CreateFolderModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            newFolderName={newFolderName}
            setNewFolderName={setNewFolderName}
            currentFolderId={currentFolderId}
            setFolderData={setFolderData}
          />

          <ConfirmDeleteModal
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            currentFolder={currentFolder}
            folderData={folderData}
            setFolderData={setFolderData}
            username={username}
          />
          {uploadProgress.length > 0 && (
            <div
              className="bg-white shadow border-deep p-3 rounded position-fixed bottom-0 end-0 m-2"
              style={{ width: "250px", zIndex: 99 }}
            >
              {uploadProgress.map((progress, index) => (
                <div>
                  <h3 className="fs-6 fw-bold">
                    File Uploaded: {progress.progress}%
                  </h3>
                  <div className="progress" key={index}>
                    <div
                      className="progress-bar bg-deep"
                      style={{ width: `${progress.progress}%` }}
                    >
                      {progress.progress}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
