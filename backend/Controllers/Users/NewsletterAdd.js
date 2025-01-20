import Newsletter from "../../Modals/Newsletter.js";

const NewsletterAdd = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is Required" });
    }

    const isExisting = await Newsletter.findOne({ email });
    if (isExisting) {
      return res.status(409).json({ error: `You are already Subscribed` });
    }

    const newsletter = Newsletter({ email });
    const savedNewsletter = await newsletter.save();
    if (savedNewsletter) {
      return res.status(200).json({ message: "Subscribed" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default NewsletterAdd;
