import SharingMailer from "../../Helper/Mailers/SharingMailer.js";
import History from "../../Modals/History.js";
import Users from "../../Modals/Users.js";

const ShareFiles = async (req, res) => {
  try {
    let { email, message } = req.body;
    const { username } = req.params;

    const isExisting = await Users.findOne({ username });
    if (!isExisting) {
      return res.status(401).json({ error: "Please Register" });
    }

    if (isExisting.status === "BLOCKED") {
      return res
        .status(403)
        .json({ error: `Sorry ${username}, You are Blocked` });
    }

    if (req.files.some((file) => !file.originalname)) {
      return res.status(400).json({ error: "Some files failed to upload." });
    }

    if (!message) {
      message = "No Message provided";
    }

    const lastSharedFile = await History.findOne().sort({ sharingId: -1 });
    const sharingId = lastSharedFile ? lastSharedFile.sharingId + 1 : 1;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded." });
    }

    const fileNames = req.files.map((file) => file.originalname);
    const filePaths = req.files.map((file) => file.path);

    const downloadLink = `http://localhost:5000/api/share/download/${sharingId}`;

    const newHistory = new History({
      senderUsername: username,
      sharingId,
      fileName: fileNames,
      filePath: filePaths,
      receiverEmail: email,
      downloadLink,
      downloadLinkExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000),
      deleteStatus: "PENDING",
      message,
    });

    const savedHistory = await newHistory.save();

    SharingMailer({ email, downloadLink, message, username });

    if (savedHistory) {
      return res.status(200).json({
        message: "Files shared successfully.",
        savedHistory,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default ShareFiles;
