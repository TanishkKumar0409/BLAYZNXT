import Recent from "../../Models/Recent.js";
import Users from "../../Models/User.js";

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

    // Check if the user has a recent history entry
    const isRecent = await Recent.findOne({ username });

    // If no Recent object exists for this username, create a new one
    if (!isRecent) {
      const createNewRecent = new Recent({
        username,
        recentFiles: [{ folderId, usedDate: Date.now() }],
      });
      const savedRecent = await createNewRecent.save();
      return res
        .status(201)
        .json({ message: "Created User Recent", savedRecent });
    }

    const recentLength = isRecent.recentFiles.length;

    // Check if this folderId already exists in the recentFiles array
    const isExisting = isRecent.recentFiles.some(
      (file) => file.folderId === folderId
    );

    if (isExisting) {
      return res.status(400).json({ error: "Same File" });
    }

    // If the recentFiles array is full (6 items), remove the oldest and add the new file
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

      return res.status(200).json({ message: "File Added to Recent" });
    } else {
      // Otherwise, just add the new recent file
      const addRecentFile = await Recent.findOneAndUpdate(
        { username },
        { $push: { recentFiles: { folderId, usedDate: Date.now() } } },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "File Added to Recent", addRecentFile });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default RecentFile;
