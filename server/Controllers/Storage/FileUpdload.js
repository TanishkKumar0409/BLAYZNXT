import Storage from "../../Models/Storage.js";
import Users from "../../Models/User.js";

const FileUpload = async (req, res) => {
  try {
    const { parentId } = req.body;
    const { username } = req.params;

    if (!parentId || !req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ error: "Required fields missing or no files uploaded" });
    }

    const isUser = await Users.findOne({ username });
    if (!isUser) {
      return res.status(401).json({ error: "Please Register" });
    }

    const folder = await Storage.findOne({
      folderId: parentId,
      username,
      type: "folder",
    });
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const currentUsedSize = isUser.usedStorage;
    const totalSize = isUser.totalStorage;
    let totalUploadedSize = req.files.reduce((acc, file) => acc + file.size, 0);
    let newUsedSize = currentUsedSize + totalUploadedSize;

    if (currentUsedSize >= totalSize) {
      return res.status(400).json({ error: "Storage Full" });
    }

    if (newUsedSize > totalSize) {
      return res.status(400).json({ error: "Do not have Enough Space" });
    }

    const uploadedFiles = [];
    const lastFolder = await Storage.findOne({ username }).sort({
      folderId: -1,
    });
    let fileId = lastFolder ? lastFolder.folderId + 1 : 1;

    for (let file of req.files) {
      const newFile = new Storage({
        folderId: fileId,
        username,
        root: file.originalname,
        type: "file",
        parentId: folder.folderId,
        children: [],
        filePath: file.path,
        fileSize: file.size,
      });

      const savedFile = await newFile.save();
      if (savedFile) {
        uploadedFiles.push(savedFile);
        await Storage.findOneAndUpdate(
          { folderId: folder.folderId, username },
          { $push: { children: savedFile.folderId } },
          { new: true }
        );
        fileId += 1;
      }
    }

    await Users.findOneAndUpdate(
      { username },
      { $set: { usedStorage: newUsedSize } },
      { new: true }
    );

    res.status(201).json({
      message: "Files uploaded successfully",
      uploadedFiles,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default FileUpload;
