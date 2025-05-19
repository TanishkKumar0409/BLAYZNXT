import Users from "../../Models/User.js";

const NotChangedPassword = async (req, res) => {
  const allUsers = await Users.find();

  const updatedUsers = [];
  for (const user of allUsers) {
    if (
      user.passwordOtpExpiry &&
      Date.now() > new Date(user.passwordOtpExpiry).getTime()
    ) {
      const canceledOtp = await Users.findOneAndUpdate(
        { email: user.email },
        { $unset: { passwordOtpExpiry: "", passwordOtp: "" } },
        { new: true }
      );
      if (canceledOtp) {
        updatedUsers.push(canceledOtp.email);
        console.log(`${canceledOtp.name} password Change Otp has Been Expired`);
      }
    }
  }
};

export default NotChangedPassword;
