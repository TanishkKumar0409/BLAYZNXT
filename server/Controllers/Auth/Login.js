import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../../Models/User.js";

const Login = async (req, res) => {
  try {
    const PrivateKey = process.env.PrivateKey;

    const { email, password } = req.body;

    const blockedUser = await Users.findOne({ email, status: "BLOCKED" });
    if (blockedUser) {
      return res
        .status(403)
        .json({ error: `Sorry ${blockedUser.username}, You are Blocked` });
    }

    const loginUser = await Users.findOne({ email });
    if (!loginUser) {
      return res.status(404).json({ error: "Email Not Found" });
    }

    const isMatch = await bcryptjs.compare(password, loginUser.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Incorrect Password" });
    }

    const loginToken = jwt.sign(
      { userId: loginUser._id, username: loginUser.username },
      PrivateKey
    );

    res.cookie("token", loginToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login Successfully", loginUser });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default Login;
