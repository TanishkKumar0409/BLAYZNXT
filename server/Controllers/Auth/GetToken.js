const GetToken = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in.", flag: "NotFound" });
    }

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default GetToken;
