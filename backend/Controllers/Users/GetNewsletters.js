import Newsletter from "../../Modals/Newsletter.js";

const GetNewsletter = async (req, res) => {
  try {
    const allNewsletter = await Newsletter.find();

    if (allNewsletter) {
      return res.status(200).json(allNewsletter);
    } else {
      return res.status(404).json({ error: "Newsletter is Empty" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default GetNewsletter;
