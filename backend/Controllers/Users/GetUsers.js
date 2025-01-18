import Users from "../../Modals/Users.js";

const GetUsers = async (req, res) => {
  try {
    const allUsers = await Users.find({ role: "USER" });

    if (allUsers) {
      return res.status(200).json(allUsers);
    } else {
      return res.status(404).json({ error: "Users Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export default GetUsers;
