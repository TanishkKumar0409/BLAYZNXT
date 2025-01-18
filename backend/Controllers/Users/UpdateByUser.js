import Users from "../../Modals/Users.js";
import bcryptjs from "bcryptjs";

const UpdateByUser = async (req, res) => {
  try {
    const { username } = req.params;

    const { name, email, contact, password } = req.body;

    const existingUser = await Users.findOne({ username });

    if (existingUser.status === "BLOCKED") {
      return res
        .status(403)
        .json({ error: `Sorry ${username}, You are Blocked.` });
    }

    let updatedPassword = existingUser.password;

    if (email && email !== existingUser.email) {
      const existingEmail = await Users.findOne({
        email,
        username: { $ne: username },
      });
      if (existingEmail) {
        return res.status(409).json({ error: "Email Already Exists." });
      }
    }

    if (contact && contact !== existingUser.contact) {
      const existingContact = await Users.findOne({
        contact,
        username: { $ne: username },
      });
      if (existingContact) {
        return res.status(409).json({ error: "Contact Already Exists." });
      }
    }

    if (password) {
      let salt = bcryptjs.genSaltSync(10);
      let hashedPassword = bcryptjs.hashSync(password, salt);
      updatedPassword = hashedPassword;
    }

    const file = req.file
      ? req.file.filename
      : existingUser
      ? existingUser.profile
      : "Uploads/Users/DefaultProfiles/DefaultProfiles.jpg";

    const updatedUser = await Users.findOneAndUpdate(
      { username },
      {
        $set: {
          profile: file,
          name,
          email,
          contact,
          password: updatedPassword,
        },
      },
      { new: true }
    );

    if (updatedUser) {
      return res
        .status(200)
        .json({ message: `${username} Update Successfully`, updatedUser });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default UpdateByUser;
