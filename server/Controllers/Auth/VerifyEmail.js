import Users from "../../Models/User.js";

const VerifyEmail = async (req, res) => {
  try {
    const { username } = req.params;
    const { otp } = req.body;

    if (!username || !otp) {
      return res.status(400).json({ error: "All Fields are required." });
    }

    const isUser = await Users.findOne({ username });
    if (!isUser) {
      return res.status(404).json({ error: "User not found." });
    }

    if (isUser.verifyOTP !== parseInt(otp)) {
      return res.status(400).json({ error: "Invalid OTP." });
    }

    if (isUser.verifyOtpExpiry <= Date.now()) {
      return res.status(400).json({ error: "OTP has expired." });
    }

    await Users.findOneAndUpdate(
      { username },
      {
        $unset: { verifyOTP: "", verifyOtpExpiry: "" },
        $set: { isVerified: true },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: `${username} verified successfully.` });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

export default VerifyEmail;
