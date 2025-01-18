import History from "../../Modals/History.js";

const GetSharedHistory = async (req, res) => {
  try {
    const allHistory = await History.find().sort({ sharingId: 1 });

    if (allHistory) {
      return res.status(200).json(allHistory);
    } else {
      return res.status(404).json({ error: "History Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default GetSharedHistory;
