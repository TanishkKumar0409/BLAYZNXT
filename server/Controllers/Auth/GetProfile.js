import jwt from "jsonwebtoken";
import Users from "../../Models/User.js";

const GetProfile = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const PrivateKey = process.env.PrivateKey;
    const decoded = jwt.verify(token, PrivateKey);

    const user = await Users.findOne({ username: decoded.username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.status === "BLOCKED") {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
      return res.status(403).json({ error: `${user.username} is blocked` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetProfile;
