import PolicyMail from "../../Mailers/PolicyMail.js";
import Legal from "../../Models/Legals.js";

const CreateAndUpdateLegals = async (req, res) => {
  try {
    const { tabId, title, legal_description } = req.body;

    const isExisting = await Legal.findOne({ tabId });

    if (!isExisting) {
      const newLegal = new Legal({ tabId, title, legal_description });
      await newLegal.save();
      return res
        .status(200)
        .json({ message: "Legal entry created successfully." });
    }

    await Legal.findOneAndUpdate(
      { tabId },
      { legal_description },
      { new: true }
    );

    PolicyMail({ title });

    return res
      .status(200)
      .json({ message: "Legal description updated successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default CreateAndUpdateLegals;
