import Legal from "../../Models/Legals.js";

const GetLegals = async (req, res) => {
  try {
    const Legals = await Legal.find();
    if (!Legal) {
      return res.status(404).json({ error: "No Legals Found" });
    }

    return res.status(200).json(Legals);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export default GetLegals;
