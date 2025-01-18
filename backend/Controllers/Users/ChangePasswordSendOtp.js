import Users from "../../Modals/Users.js";
import nodemailer from "nodemailer";

const ChangePasswordSendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const isUser = await Users.findOne({ email });
    if (!isUser) {
      return res.status(404).json({ error: "Email Not Found" });
    }
    if (isUser.status === "BLOCKED") {
      return res
        .status(403)
        .json({ error: `Sorry ${isUser.username}, You are Blocked.` });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    const MailHost = process.env.MailHost;
    const MailPort = process.env.MailPort;
    const MailUser = process.env.MailUser;
    const MailPassword = process.env.MailPassword;

    const transport = nodemailer.createTransport({
      host: MailHost,
      port: MailPort,
      auth: {
        user: MailUser,
        pass: MailPassword,
      },
    });

    const MailSchema = {
      from: MailUser,
      to: email,
      subject: "Your Password OTP",
      text: `Your OTP is: ${otp}`,
      html: `<h1>OTP: ${otp}</h1>`,
    };

    const info = await transport.sendMail(MailSchema);
    console.log(info.response);
    if (info.accepted.length > 0) {
      const updatedUser = await Users.findOneAndUpdate(
        { email },
        {
          $set: {
            passwordOtp: otp,
            passwordOtpExpiry: new Date(Date.now() + 600000),
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res
          .status(500)
          .json({ error: "Failed to update user with OTP" });
      }

      return res.status(200).json({ message: "OTP sent successfully" });
    } else {
      return res.status(500).json({ error: "Failed to send OTP email" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default ChangePasswordSendOtp;
