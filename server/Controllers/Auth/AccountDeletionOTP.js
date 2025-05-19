import bcryptjs from "bcryptjs";
import DeleteAccountMail from "../../Mailers/DeleteAccountMail.js";
import Users from "../../Models/User.js";

const AccountDeletionOTP = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (existingUser.status === "BLOCKED") {
      return res
        .status(403)
        .json({ error: `Sorry ${existingUser.username}, you are blocked.` });
    }

    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await DeleteAccountMail(email, otp);

    const updatedUser = await Users.findOneAndUpdate(
      { email },
      {
        $set: {
          deletionOtp: otp,
          otpExpiry: new Date(Date.now() + 3 * 60 * 1000),
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ error: "Failed to update user with OTP" });
    }

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default AccountDeletionOTP;
