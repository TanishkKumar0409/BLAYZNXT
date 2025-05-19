import bcryptjs from "bcryptjs";
import Users from "../../Models/User.js";

const ChangePassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

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
        return res
          .status(200)
          .json({ message: "Password Changed Successfully" });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default ChangePassword;
