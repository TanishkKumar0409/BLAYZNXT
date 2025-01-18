import History from "../../Modals/History.js";

const GetSharedHistoryByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const UserHistory = await History.find({ senderUsername: username }).sort({
      createdAt: -1,
    });

    if (UserHistory) {
      return res.status(200).json(UserHistory);
    } else {
      return res.status(404).json({ error: "History Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default GetSharedHistoryByUsername;
