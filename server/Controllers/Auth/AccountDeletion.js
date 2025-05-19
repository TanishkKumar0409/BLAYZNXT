import History from "../../Models/History.js";
import Recent from "../../Models/Recent.js";
import Storage from "../../Models/Storage.js";
import Users from "../../Models/User.js";

const AccountDeletion = async (req, res) => {
  try {
    const { username } = req.params;
    const { deletionOtp } = req.body;

    if (!deletionOtp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    const isUser = await Users.findOne({ username });
    if (!isUser) {
      return res.status(404).json({ error: "User not Found" });
    }
    if (isUser.deletionOtp !== parseInt(deletionOtp)) {
      return res.status(400).json({ error: "Invalid Otp" });
    }

    const DeletedUser = await Users.findOneAndDelete({ username });
    const DeletedStorage = await Storage.deleteMany({ username });
    await History.deleteMany({ senderUsername: username });
    await Recent.deleteMany({ username });

    if (DeletedUser) {
      res.clearCookie("token");
      return res.status(200).json({
        message: `${username} Account is Deleted`,
        DeletedUser,
        DeletedStorage,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default AccountDeletion;
