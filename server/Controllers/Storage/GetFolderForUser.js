import Storage from "../../Models/Storage.js";
import Users from "../../Models/User.js";

const GetFolderForUser = async (req, res) => {
  try {
    const { username } = req.params;

    const isUser = await Users.findOne({ username });
    if (!isUser) {
      return res.status(401).json({ error: "Please Register" });
    }

    const folders = await Storage.find({ username });

    if (folders) {
      return res.status(200).json(folders);
    } else {
      return res.status(404).json({ error: "No Folder Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetFolderForUser;
