import bcryptjs from "bcryptjs";
import VerifyMail from "../../Mailers/VerifyMail.js";
import Users from "../../Models/User.js";
import Storage from "../../Models/Storage.js";

const registerUser = async (req, res) => {
  try {
    const { username, name, email, contact, password } = req.body;

    const role = "USER";
    const status = "ACTIVE";

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    if (!username || !name || !email || !contact || !password) {
      return res.status().json({ error: "Required fields missing" });
    }

    const blockedUser = await Users.findOne({
      $or: [{ email }, { contact }],
      status: "BLOCKED",
    });
    if (blockedUser) {
      return res
        .status(403)
        .json({ error: `Sorry ${username}, You are Blocked.` });
    }

    const isExistingUsername = await Users.findOne({ username });
    if (isExistingUsername) {
      return res.status(409).json({ error: "Username Already Exists." });
    }

    const isExistingEmail = await Users.findOne({ email });
    if (isExistingEmail) {
      return res.status(409).json({ error: "Email Already Exists." });
    }

    const isExistingContact = await Users.findOne({ contact });
    if (isExistingContact) {
      return res.status(409).json({ error: "Contact Already Exists." });
    }

    const newUser = new Users({
      username,
      name,
      email,
      contact,
      status,
      role,
      password: hashedPassword,
    });

    const createFolder = Storage({
      folderId: 1,
      username,
      root: username,
      type: "folder",
      parentId: null,
      children: [],
    });

    await newUser.save();
    await createFolder.save();
    await VerifyMail({ username, email, emailType: "VERIFY" });

    return res.status(201).json({ message: "You are Registered Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default registerUser;
