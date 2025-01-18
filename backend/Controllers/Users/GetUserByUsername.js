import Users from "../../Modals/Users.js";

const GetUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const getUser = await Users.findOne({ username });

    if (getUser) {
      return res.status(200).json(getUser);
    } else {
      return res.status(404).json({ error: "User Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default GetUserByUsername;
