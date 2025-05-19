import Recent from "../../Models/Recent.js";

const GetRecents = async (req, res) => {
  try {
    const { username } = req.params;

    const getRecents = await Recent.findOne({ username });

    if (getRecents) {
      return res.status(200).json(getRecents);
    } else if (!getRecents) {
      return res.status(400).json({ error: "No Recent Files" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default GetRecents;
