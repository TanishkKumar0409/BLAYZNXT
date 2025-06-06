import Contact from "../../Models/ContactUs.js";

const DeleteQuery = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Query ID is required" });
    }

    const deletedQuery = await Contact.findOneAndDelete({ _id: id });

    if (deletedQuery) {
      return res.status(200).json({ message: "Query Deleted" });
    } else {
      return res.status(404).json({ error: "Query Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default DeleteQuery;
