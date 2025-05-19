import History from "../../Models/History.js";

const GetSharedHistoryByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const allHistory = await History.find({ senderUsername: username }).sort({
      sharingId: -1,
    });

    if (allHistory) {
      return res.status(200).json(allHistory);
    } else {
      return res.status(404).json({ error: "History Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default GetSharedHistoryByUsername;
