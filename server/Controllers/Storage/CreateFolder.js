import Storage from "../../Models/Storage.js";
import Users from "../../Models/User.js";

const CreateFolder = async (req, res) => {
  try {
    const { username, root, parentId } = req.body;

    if (!username || !root || !parentId) {
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

    const RepeatedFolder = await Storage.findOne({ username, root, parentId });
    if (RepeatedFolder) {
      return res.status(409).json({ error: "This Folder is Already exist" });
    }

    let parentFolder = null;

    if (parentId) {
      parentFolder = await Storage.findOne({ folderId: parentId, username });
      if (!parentFolder) {
        return res.status(404).json({ error: "Parent folder not found" });
      }
    }

    const lastFolder = await Storage.findOne({ username }).sort({
      folderId: -1,
    });
    const folderId = lastFolder ? lastFolder.folderId + 1 : 1;

    const newFolder = new Storage({
      folderId,
      username,
      root,
      type: "folder",
      parentId: parentFolder ? parentFolder.folderId : null,
      children: [],
    });

    const savedFolder = await newFolder.save();

    if (savedFolder) {
      if (parentFolder) {
        const setChildren = await Storage.findOneAndUpdate(
          { folderId: parentFolder.folderId, username },
          { $push: { children: savedFolder.folderId } },
          { new: true }
        );

        res.status(201).json({
          message: "Folder created successfully",
          savedFolder,
          setChildren,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default CreateFolder;
