import Users from "../../Modals/Users.js";

const GetAdmin = async (req, res) => {
  try {
    const allAdmin = await Users.find({ role: "ADMIN" });

    if (allAdmin) {
      return res.status(200).json(allAdmin);
    } else {
      return res.status(404).json({ error: "Admins Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default GetAdmin;
