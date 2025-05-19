import Contact from "../../Models/ContactUs.js";

const UpdateQueryStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const query = await Contact.findById(id);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    const getNextStatus = (current) => {
      switch (current) {
        case "PENDING":
          return "ACTIVE";
        case "ACTIVE":
          return "COMPLETED";
        case "COMPLETED":
          return "SUSPENDED";
        case "SUSPENDED":
          return "PENDING";
        default:
          return "PENDING";
      }
    };

    const updatedQuery = await Contact.findOneAndUpdate(
      { _id: id },
      { $set: { status: getNextStatus(query.status) } },
      { new: true }
    );

    return res.status(200).json({
      message: "Status updated successfully",
      query: updatedQuery,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default UpdateQueryStatus;
