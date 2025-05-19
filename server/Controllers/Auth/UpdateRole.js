import Users from "../../Models/User.js";

const UpdateRole = async (req, res) => {
  try {
    const { username, role } = req.params;

    const isNotValid = await Users.findOne({ username });
    if (!isNotValid) {
      return res.status(404).json({ error: `${username} Not Found` });
    }

    const newAdmin = await Users.findOneAndUpdate(
      { username },
      { $set: { role: role.toUpperCase() } },
      { new: true }
    );

    if (newAdmin) {
      return res
        .status(200)
        .json({ message: `${username} is Promoted`, newAdmin });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default UpdateRole;
