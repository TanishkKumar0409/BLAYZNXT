import Newsletter from "../../Models/Newsletter.js";

const GetNewsletter = async (req, res) => {
  try {
    const allNewsletter = await Newsletter.find().sort({ createdAt: -1 });

    if (allNewsletter) {
      return res.status(200).json(allNewsletter);
    } else {
      return res.status(404).json({ error: "Newsletter is Empty" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default GetNewsletter;
