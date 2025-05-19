import Contact from "../../Models/ContactUs.js";

const GetQueryByObjectId = async (req, res) => {
  try {
    const { id } = req.params;
    const queries = await Contact.findOne({ _id: id });
    if (queries) {
      return res.status(200).json(queries);
    } else {
      return res.status(200).json({ message: "There are not Query" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default GetQueryByObjectId;
