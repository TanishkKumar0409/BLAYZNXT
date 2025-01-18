import Users from "../../Modals/Users.js";

const BlockUser = async (req, res) => {
  try {
    const { username } = req.params;

    const blockedUser = await Users.findOneAndUpdate(
      { username },
      { $set: { status: "BLOCKED" } },
      { new: true }
    );

    if (blockedUser) {
      return res
        .status(200)
        .json({ message: `${username} is Blocked`, blockedUser });
    } else {
      return res.status(404).json({ error: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default BlockUser;
