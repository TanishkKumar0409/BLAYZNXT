import Users from "../../Modals/Users.js";

const RemoveAdmin = async (req, res) => {
  try {
    const { username } = req.params;

    const isNotValid = await Users.findOne({ username });
    if (isNotValid.role === "USER") {
      return res.status(409).json({ error: "Already USER" });
    }

    const newAdmin = await Users.findOneAndUpdate(
      { username },
      { $set: { role: "USER" } },
      { new: true }
    );

    if (newAdmin) {
      return res
        .status(200)
        .json({ message: `${username} is Demoted`, newAdmin });
    } else {
      return res.status(404).json({ error: "User not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default RemoveAdmin;
