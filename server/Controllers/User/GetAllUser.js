import Users from "../../Models/User.js";

const GetAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();

    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(404).json({ error: "Users Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};
export default GetAllUsers;
