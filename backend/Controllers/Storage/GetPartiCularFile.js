import Storage from "../../Modals/Storage.js";

const GetParticularFile = async (req, res) => {
  try {
    const { username, folderId } = req.query;

    if (!username || !folderId) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const file = await Storage.findOne({ username, folderId });

    if (!file || (!file.filePath && !file.root)) {
      return res.status(404).json({ error: "File not found" });
    }

    return res.status(200).json({ file });
  } catch (error) {
    console.error("Error fetching file:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetParticularFile;
