import Users from "../../Models/User.js";

const ProfileChange = async (req, res) => {
  try {
    const { username } = req.params;
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const updatedUser = await Users.findOneAndUpdate(
      { username },
      { profile: profileImage.filename },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Profile image updated successfully",
      profile: updatedUser.Profile,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default ProfileChange;
