import Users from "../../Models/User.js";

const GetUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const getUser = await Users.findOne({ username });

    if (getUser) {
      return res.status(200).json(getUser);
    } else {
      return res.status(404).json({ error: `${username} Not Found` });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error", });
  }
};

export default GetUserByUsername;
