import Contact from "../../Models/ContactUs.js";

const GetAllQuery = async (req, res) => {
  try {
    const queries = await Contact.find().sort({ createdAt: -1 });
    if (queries) {
      return res.status(200).json(queries);
    } else {
      return res.status(200).json({ message: "There are not Query" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default GetAllQuery;
