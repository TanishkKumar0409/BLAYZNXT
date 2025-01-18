import VerifyMail from "../../Helper/Mailers/VerifyMail.js";
import Users from "../../Modals/Users.js";

const VerifySendOtp = async (req, res) => {
  try {
    const { username } = req.params;
    const { email } = req.body;

    const isUser = await Users.findOne({ username, email });
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
      email,
      emailType: "VERIFY",
    });

    return res.status(200).json({ message: mailMessage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default VerifySendOtp;
