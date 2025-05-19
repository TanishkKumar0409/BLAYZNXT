import VerifyMail from "../../Mailers/VerifyMail.js";
import Users from "../../Models/User.js";

const ResendVerifyOTP = async (req, res) => {
  try {
    const { username } = req.params;
    const isUser = await Users.findOne({ username });
    if (!isUser) {
      return res.status(401).json({ error: "Please Register" });
    }

    if (isUser.status === "BLOCKED") {
      return res
        .status(400)
        .json({ error: `Sorry ${username}, You are Blocked` });
    }

    const mailMessage = await VerifyMail({
      username,
      email: isUser?.email,
      emailType: "VERIFY",
    });

    return res.status(200).json({ message: mailMessage });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default ResendVerifyOTP;
