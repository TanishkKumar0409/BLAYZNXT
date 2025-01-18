import Storage from "../../Modals/Storage.js";
import Users from "../../Modals/Users.js";

const GetFolder = async (req, res) => {
  try {
    const { username } = req.params;

    const isUser = await Users.findOne({ username });
    if (!isUser) {
      return res.status(401).json({ error: "Please Register" });
    }

    if (isUser.status === "BLOCKED") {
      return res.status(403).json({ error: `Sorry ${username}, You are Blocked` });
    }

    const folders = await Storage.find({ username });

    if (folders) {
      return res.status(200).json(folders);
    } else {
      return res.status(404).json({ error: "No Folder Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default GetFolder;
