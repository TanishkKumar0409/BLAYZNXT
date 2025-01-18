import React from "react";
import { toast } from "react-toastify";
import { noFileAPI } from "../../../../../Services/API/API";

export default function CreateFolderModal({
  isModalOpen,
  setIsModalOpen,
  newFolderName,
  setNewFolderName,
  currentFolderId,
  setFolderData,
}) {
  if (!isModalOpen) return null;
  const username = JSON.parse(localStorage.getItem("user"));

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast.error("Folder name cannot be empty.");
      return;
    }

    try {
      const response = await noFileAPI.post("/storage/folder/create", {
        username,
        root: newFolderName,
        parentId: currentFolderId,
      });

      setNewFolderName("");
      setIsModalOpen(false);

      const updatedData = await noFileAPI.get(`storage/folder/${username}`);
      setFolderData(updatedData.data);

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error creating folder.");
      console.error(error);
    }
  };

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(5px)",
    zIndex: 1040,
  };

  return (
    <>
      <div className="modal-backdrop fade show" style={modalStyle} />
      <div className="modal fade show d-block" style={{ zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Folder
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setIsModalOpen(false);
                  toast.info("Folder Not Created");
                }}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <input
                  type="text"
                  id="create folder"
                  className="form-control"
                  placeholder="Enter Folder Name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-custom custom-btn"
                  onClick={handleCreateFolder}
                >
                  Create Folder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
