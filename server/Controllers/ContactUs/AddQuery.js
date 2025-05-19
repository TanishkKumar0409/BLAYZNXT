import Contact from "../../Models/ContactUs.js";

const AddQuery = async (req, res) => {
  try {
    let { name, email, phone, subject, message } = req.body;

    const userMessage = message ? message : "No Message Provided";

    const newQuery = Contact({
      name,
      email,
      contact: phone,
      subject,
      message: userMessage,
    });

    const savedQuery = await newQuery.save();
    if (savedQuery) {
      return res.status(201).json({
        message: ` Thank you ${name} for reaching out. Our team will get back to you as soon as possible.`,
        savedQuery,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default AddQuery;
