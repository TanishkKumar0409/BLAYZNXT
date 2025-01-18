import Users from "../../Modals/Users.js";

const CreateAdmin = async (req, res) => {
  try {
    const { username } = req.params;

    const isNotValid = await Users.findOne({ username });
    if (isNotValid.status === "BLOCKED") {
      return res.status(403).json({ error: "User is Blocked" });
    } else if (isNotValid.role === "ADMIN") {
      return res.status(409).json({ error: "Already Admin" });
    }

    const newAdmin = await Users.findOneAndUpdate(
      { username },
      { $set: { role: "ADMIN" } },
      { new: true }
    );

    if (newAdmin) {
      return res.status(200).json({ message:  `${username} is Promoted`, newAdmin });
    } else {
      return res.status(404).json({ error: "User not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default CreateAdmin;
