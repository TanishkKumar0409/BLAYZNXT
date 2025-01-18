import Contact from "../../Modals/ContactUs.js";

const UserContactUs = async (req, res) => {
  try {
    let { name, email, contact, subject, message } = req.body;

    const userMessage = message ? message : "No Message Provided";

    const newQuery = Contact({
      name,
      email,
      contact,
      subject,
      message: userMessage,
    });

    const savedQuery = await newQuery.save();
    if (savedQuery) {
      return res
        .status(201)
        .json({ message: `${name} Message sent`, savedQuery });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default UserContactUs;
