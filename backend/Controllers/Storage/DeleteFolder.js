import Storage from "../../Modals/Storage.js";
import Users from "../../Modals/Users.js";
import Recent from "../../Modals/RecentFile.js";

const DeleteFolder = async (req, res) => {
  try {
    const { username, folderId } = req.body;

    if (!username || !folderId) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const isUser = await Users.findOne({ username });
    if (!isUser) {
      return res.status(401).json({ error: "Please Register" });
    }

    if (isUser.status === "BLOCKED") {
      return res
        .status(403)
        .json({ error: `Sorry ${username}, You are Blocked` });
    }

    if (folderId === 1) {
      return res.status(403).json({ error: "You cannot delete this folder" });
    }

    const isFolder = await Storage.findOne({ username, folderId });
    if (!isFolder) {
      return res.status(404).json({ error: "This folder does not exist" });
    }

    const isRecent = await Recent.findOne({
      username,
      "recentFiles.folderId": folderId,
    });

    let totalSizeFreed = 0;

    const deleteChildren = async (parentFolderId) => {
      const children = await Storage.find({
        username,
        parentId: parentFolderId,
      });

      for (const child of children) {
        await deleteChildren(child.folderId);

        if (child.type === "file") {
          totalSizeFreed += child.fileSize || 0;
        }

        await Storage.findOneAndDelete({ username, folderId: child.folderId });
      }
    };

    await deleteChildren(folderId);

    const deletedFolder = await Storage.findOneAndDelete({
      username,
      folderId,
    });

    if (deletedFolder) {
      const deleteParentId = deletedFolder.parentId;
      if (deleteParentId) {
        await Storage.findOneAndUpdate(
          { username, folderId: deleteParentId },
          { $pull: { children: folderId } },
          { new: true }
        );

        if (deletedFolder.type === "file") {
          totalSizeFreed += deletedFolder.fileSize || 0;
        }

        if (isRecent) {
          await Recent.findOneAndUpdate(
            { username },
            { $pull: { recentFiles: { folderId: folderId } } }
          );
        }
      }
    }

    if (totalSizeFreed > 0) {
      const currentUsedSize = isUser.usedStorage || 0;
      const updatedUsedSize = Math.max(0, currentUsedSize - totalSizeFreed);
      await Users.findOneAndUpdate(
        { username },
        { $set: { usedStorage: updatedUsedSize } },
        { new: true }
      );
    }

    return res.status(200).json({
      message: "Folder/File deleted successfully",
      storageFreed: totalSizeFreed,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default DeleteFolder;
