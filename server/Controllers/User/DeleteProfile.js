import Users from "../../Models/User.js";

const DeleteProfileImage = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const updatedUser = await Users.findOneAndUpdate(
      { username },
      { $unset: { profile: "" } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Profile image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default DeleteProfileImage;
