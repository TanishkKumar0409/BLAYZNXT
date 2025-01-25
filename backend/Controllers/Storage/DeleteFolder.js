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

    let allFolderChildrens = isFolder?.children;

    await handleRecents({ username, id: folderId });
    await handleRepeats({ allFolderChildrens, username });

    let totalSizeFreed = await handleStorage({
      username,
      folderId,
      isUser,
    });

    return res.status(200).json({
      message: `${
        isFolder.type === "file" ? "File" : "Folder"
      } is Deleted Successfully`,
      storageFreed: totalSizeFreed,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default DeleteFolder;

const handleRecents = async ({ id, username }) => {
  const isRecent = await Recent.findOne({
    username,
    "recentFiles.folderId": id,
  });

  if (isRecent) {
    await Recent.findOneAndUpdate(
      { username },
      { $pull: { recentFiles: { folderId: id } } }
    );
  }
};

const handleRepeats = async ({ allFolderChildrens, username }) => {
  for (const folderId of allFolderChildrens) {
    const isFile = await Storage.findOne({ username, folderId });
    if (isFile.type === "file") {
      await handleRecents({ username, id: isFile.folderId });
    }
    if (isFile.type === "folder") {
      allFolderChildrens = isFile?.children;
      await handleRepeats({ allFolderChildrens, username });
    }
  }
};

const deleteChildren = async (username, parentFolderId, totalSizeFreed = 0) => {
  const children = await Storage.find({
    username,
    parentId: parentFolderId,
  });

  for (const child of children) {
    totalSizeFreed = await deleteChildren(
      username,
      child.folderId,
      totalSizeFreed
    );

    if (child.type === "file") {
      totalSizeFreed += child.fileSize || 0;
    }

    await Storage.findOneAndDelete({ username, folderId: child.folderId });
  }

  return totalSizeFreed;
};

const handleStorage = async ({ username, folderId, isUser }) => {
  let totalSizeFreed = 0;

  totalSizeFreed = await deleteChildren(username, folderId, totalSizeFreed);

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

  return totalSizeFreed;
};
