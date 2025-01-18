import Users from "../../Modals/Users.js";

const CancelDelete = async (req, res) => {
  const allUsers = await Users.find();

  const updatedUsers = [];
  for (const user of allUsers) {
    if (user.otpExpiry && Date.now() > new Date(user.otpExpiry).getTime()) {
      const canceledOtp = await Users.findOneAndUpdate(
        { email: user.email },
        { $unset: { otpExpiry: "", deletionOtp: "" } },
        { new: true }
      );
      if (canceledOtp) {
        updatedUsers.push(canceledOtp.email);
        console.log(`${canceledOtp.name} Otp has Been Expired`);
      }
    }
  }
};

export default CancelDelete;
