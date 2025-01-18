import Users from "../../Modals/Users.js";

const UnVerifyed = async (req, res) => {
  const allUsers = await Users.find();

  const updatedUsers = [];
  for (const user of allUsers) {
    if (
      user.verifyOtpExpiry &&
      Date.now() > new Date(user.verifyOtpExpiry).getTime()
    ) {
      const canceledOtp = await Users.findOneAndUpdate(
        { email: user.email },
        {
          $unset: { verifyOtpExpiry: "", verifyOTP: "" },
          $set: { status: "UNVERIFIED" },
        },
        { new: true }
      );
      if (canceledOtp) {
        updatedUsers.push(canceledOtp.email);
        console.log(`${canceledOtp.name} Verification Otp has Been Expired`);
      }
    }
  }
};

export default UnVerifyed;
