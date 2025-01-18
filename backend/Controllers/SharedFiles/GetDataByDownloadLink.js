import History from "../../Modals/History.js";

const GetDataByDownloadLink = async (req, res) => {
  try {
    const { username } = req.params;
    const data = await History.findOne({
      senderUsername: username,
      downloadLink: { $exists: true, $ne: null },
    }).sort({ sharingId: -1 });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default GetDataByDownloadLink;
