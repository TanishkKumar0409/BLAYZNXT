import React from "react";
import { toast } from "react-toastify";
import { noFileAPI } from "../../../../../Services/API/API";

export default function ConfirmDeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedItemId,
  setSelectedItemId,
  currentFolder,
  setFolderData
}) {
  if (!isDeleteModalOpen) return null;

  const username=JSON.parse(localStorage.getItem(`user`))

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

  return (
    <>
      <div className="modal-backdrop modalBg-1 blurBg-1" />
      <div className="modal d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h5 className="modal-title mb-3 text-center">
                  Confirm Deletion
                </h5>
                <p>
                  Are you sure you want to delete these file/folder? This action
                  cannot be undone.
                </p>
              </div>
            </div>
            <div className="modal-body text-center">
              <button
                type="button"
                className="btn btn-deep"
                onClick={handleDeleteItem}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-outline-deep ms-2"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  toast.info("Cancel Delete");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
