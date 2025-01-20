import path from "path";
import fs from "fs";
import Storage from "../../Modals/Storage.js";
import Users from "../../Modals/Users.js";

const DownloadStoredFile = async (req, res) => {
  try {
    const { username, folderId } = req.query;

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

    const file = await Storage.findOne({ username, folderId });

    if (!file || (!file.filePath && !file.root)) {
      return res.status(404).json({ error: "File not found" });
    }

    const absolutePath = path.resolve(file.filePath);

    if (!fs.existsSync(absolutePath)) {
      return res
        .status(404)
        .json({ error: "File does not exist on the server" });
    }

    res.download(absolutePath, file.root, (error) => {
      if (error) {
        console.error("Error during file download:", error.message);
        return res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export default DownloadStoredFile;
