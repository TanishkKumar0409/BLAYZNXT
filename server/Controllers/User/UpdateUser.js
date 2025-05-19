import Users from "../../Models/User.js";

const UpdateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { name, email, contact, address, pincode, city, state, country } =
      req.body;

    const existingEmailUser = await Users.findOne({
      email,
      username: { $ne: username },
    });
    if (existingEmailUser) {
      return res
        .status(400)
        .json({ message: "Email is already in use by another user." });
    }

    const existingContactUser = await Users.findOne({
      contact,
      username: { $ne: username },
    });
    if (existingContactUser) {
      return res
        .status(400)
        .json({ message: "Contact is already in use by another user." });
    }

    const updatedUser = await Users.findOneAndUpdate(
      { username },
      { name, email, contact, address, pincode, city, state, country },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default UpdateUser;
