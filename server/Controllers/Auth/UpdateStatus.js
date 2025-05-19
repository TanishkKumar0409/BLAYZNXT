import Users from "../../Models/User.js";

const UpdateStatus = async (req, res) => {
  try {
    const { username, status } = req.params;

    const statusUpdated = await Users.findOneAndUpdate(
      { username },
      { $set: { status: status.toUpperCase() } },
      { new: true }
    );

    if (statusUpdated) {
      return res.status(200).json({ message: `${username} is ${status} now.` });
    } else {
      return res.status(404).json({ error: `${username} Not Found` });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default UpdateStatus;
