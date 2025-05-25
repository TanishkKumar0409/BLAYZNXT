import History from "../../Models/History.js";

const redirector = async (req, res) => {
  try {
    const { id } = req.params;
    const find = await History.findById(id);

    if (!find || !find.downloadLink) {
      return res.status(404).send("Download link not found.");
    }

    if (Date.now() > new Date(find.downloadLinkExpiry)) {
      return res.status(410).json({ error: "This link has expired." });
    }

    return res.redirect(find.downloadLink);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default redirector;
