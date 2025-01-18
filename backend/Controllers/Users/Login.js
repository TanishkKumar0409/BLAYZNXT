import Users from "../../Modals/Users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

    const loginToken = jwt.sign({ email, password }, PrivateKey);

    const isAdmin = loginUser.role;

    if (isAdmin === "ADMIN") {
      const adminToken = jwt.sign({ email, password, isAdmin }, PrivateKey);
      return res.status(200).json({
        message: "Login Successfully",
        loginToken,
        adminToken,
        loginUser,
      });
    }

    if (loginUser && isMatch && loginToken) {
      return res
        .status(200)
        .json({ message: "Login Successfully", loginToken, loginUser });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default Login;
