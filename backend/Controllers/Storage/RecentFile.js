import Recent from "../../Modals/RecentFile.js";
import Users from "../../Modals/Users.js";

const RecentFile = async (req, res) => {
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

    const isRecent = await Recent.findOne({ username });

    const recentLength = isRecent?.recentFiles.length;

    const isExisting = await Recent.findOne({
      username,
      "recentFiles.folderId": folderId,
    });
    if (isExisting) {
      return res.status(409).json({ error: "Same File" });
    }

    if (!isRecent) {
      const createNewRecent = Recent({
        username,
        recentFiles: [{ folderId, usedDate: Date.now() }],
      });
      const savedRecent = await createNewRecent.save();

      return res
        .status(201)
        .json({ message: "Created User Recent", savedRecent });
    }

    if (isRecent) {
      if (recentLength >= 6) {
        const oldestFile = isRecent.recentFiles.reduce((oldest, current) => {
          return current.usedDate < oldest.usedDate ? current : oldest;
        });

        await Recent.findOneAndUpdate(
          { username },
          { $pull: { recentFiles: { _id: oldestFile._id } } }
        );

        await Recent.findOneAndUpdate(
          { username },
          { $push: { recentFiles: { folderId, usedDate: Date.now() } } },
          { new: true }
        );

        return res.status(200).json({ message: "File Add To Recent" });
      } else {
        const addRecentFile = await Recent.findOneAndUpdate(
          { username },
          { $push: { recentFiles: { folderId, usedDate: Date.now() } } },
          { new: true }
        );

        return res
          .status(200)
          .json({ message: "File Add To Recent", addRecentFile });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default RecentFile;
