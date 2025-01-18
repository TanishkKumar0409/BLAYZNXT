import React from "react";
import { toast } from "react-toastify";
import { noFileAPI } from "../../../../../Services/API/API";

export default function ConfirmDeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedItemId,
  setSelectedItemId,
  currentFolder,
  setFolderData,
  username,
}) {
  if (!isDeleteModalOpen) return null;

  const handleDeleteItem = async () => {
    if (!selectedItemId) {
      toast("No item selected to delete.");
      return;
    }

    try {
      const response = await noFileAPI.delete("/storage/folder/delete", {
        data: { username, folderId: selectedItemId },
      });

      const selectedIndex = currentFolder.children.indexOf(selectedItemId);

      if (selectedIndex !== -1) {
        const updatedChildren = currentFolder.children.filter(
          (childId) => childId !== selectedItemId
        );

        const updatedData = await noFileAPI.get(`storage/folder/${username}`);
        setFolderData(updatedData.data);
        currentFolder.children = updatedChildren;

        setSelectedItemId(null);

        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }

    setIsDeleteModalOpen(false);
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
      <div
        className="modal fade show d-block"
        style={{ zIndex: 1050 }}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsDeleteModalOpen(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete these file/folder? This action
                cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-custom custom-btn"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  toast.info("Cancel Delete");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-custom custom-btn"
                onClick={handleDeleteItem}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
