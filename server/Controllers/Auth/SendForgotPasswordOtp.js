import nodemailer from "nodemailer";
import Users from "../../Models/User.js";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const SendForgotPasswordOtp = async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const { email } = req.body;

    const isUser = await Users.findOne({ email });
    if (!isUser) {
      return res.status(404).json({ error: "Email Not Found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

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
    const templatePath = path.join(
      __dirname,
      "../../Templates/ForgotPasswordTemplate.ejs"
    );
    const htmlContent = await ejs.renderFile(templatePath, {
      otp,
      username: isUser.username,
    });

    const MailSchema = {
      from: MailUser,
      to: email,
      subject: "Your Password OTP",
      text: `Your Reset Password OTP is: ${otp}`,
      html: htmlContent,
    };

    const info = await transport.sendMail(MailSchema);
    if (info.accepted.length > 0) {
      const updatedUser = await Users.findOneAndUpdate(
        { email },
        {
          $set: {
            passwordOtp: otp,
            passwordOtpExpiry: new Date(Date.now() + 2 * 60 * 60 * 1000),
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
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default SendForgotPasswordOtp;
