import Recent from "../../Modals/RecentFile.js";

const GetRecents = async (req, res) => {
  try {
    const { username } = req.params;

    const getRecents = await Recent.findOne({ username });

    if (getRecents) {
      return res.status(200).json(getRecents);
    } else if (!getRecents) {
      return res.status(200).json({ message: "No Recent Files" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default GetRecents;
