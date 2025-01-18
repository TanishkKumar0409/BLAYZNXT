import Users from "../../Modals/Users.js";
import Storage from "../../Modals/Storage.js";
import History from "../../Modals/History.js";
import Recent from "../../Modals/RecentFile.js";

const DeleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const { deletionOtp } = req.body;
    console.log(username, deletionOtp);

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
      return res.status(200).json({
        message: `${username} Account is Deleted`,
        DeletedUser,
        DeletedStorage,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default DeleteUser;
