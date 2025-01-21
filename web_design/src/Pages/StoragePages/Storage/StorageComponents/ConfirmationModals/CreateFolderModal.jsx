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

  return (
    <>
      <div className="modal-backdrop modalBg-1 blurBg-1" />
      <div className="modal d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header border-0 justify-content-center">
              <div className="text-center">
                <h5
                  className="modal-title fs-2 fw-bold mb-3"
                  id="exampleModalLabel"
                >
                  Create New Folder
                </h5>
                <p>Enter a name of Folder to Create</p>
              </div>
            </div>
            <div className="modal-body py-0">
              <input
                type="text"
                id="create folder"
                className="form-control border-deep"
                placeholder="Enter Folder Name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateFolder();
                  }
                }}
              />
              <div className="row py-3">
                <div className="col text-center">
                  <button
                    type="button"
                    className="btn btn-deep"
                    onClick={handleCreateFolder}
                  >
                    Create Folder
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-deep ms-2"
                    onClick={() => {
                      setIsModalOpen(false);
                      toast.info("Folder Not Created");
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
