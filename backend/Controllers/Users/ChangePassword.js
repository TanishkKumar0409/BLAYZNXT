import Users from "../../Modals/Users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const ChangePassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const PrivateKey = process.env.PrivateKey;

    const isUser = await Users.findOne({ email });
    if (!isUser) {
      return res.status(404).json({ error: "Email Not Found" });
    }
    if (isUser.status === "BLOCKED") {
      return res
        .status(403)
        .json({ error: `Sorry ${isUser.username}, You are Blocked.` });
    }

    if (isUser.passwordOtp !== parseInt(otp)) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    const isCurrentPasswort = await bcryptjs.compare(password, isUser.password);
    if (isCurrentPasswort) {
      return res
        .status(400)
        .json({ error: "This Your Current Password. Use Another" });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    if (isUser.passwordOtp === parseInt(otp)) {
      const changedPassword = await Users.findOneAndUpdate(
        { email },
        {
          $set: { password: hashedPassword },
          $unset: { passwordOtp: "", passwordOtpExpiry: "" },
        },
        { new: true }
      );

      if (changedPassword) {
        const loginToken = jwt.sign({ email, password }, PrivateKey);

        const isAdmin = isUser.role;

        if (isAdmin === "ADMIN") {
          const adminToken = jwt.sign({ email, password, isAdmin }, PrivateKey);

          return res.status(200).json({
            message: "Password Changed Successfully",
            changedPassword,
            loginToken,
            adminToken,
          });
        }

        return res.status(200).json({
          message: "Password Changed Successfully",
          changedPassword,
          loginToken,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default ChangePassword;
