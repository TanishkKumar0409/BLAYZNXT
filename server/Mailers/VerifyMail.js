import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import Users from "../Models/User.js";

const VerifyMail = async ({ username, email, emailType }) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const verifyOTP = Math.floor(Math.random() * 900000 + 100000);

    if (emailType === "VERIFY") {
      await Users.findOneAndUpdate(
        { username },
        {
          $set: {
            verifyOTP: verifyOTP,
            verifyOtpExpiry: new Date(Date.now() + 10000),
          },
        },
        { new: true }
      );
    }

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

    const templatePath = path.join(__dirname, "../Templates/EmailTemplate.ejs");
    const htmlContent = await ejs.renderFile(templatePath, {
      verifyOTP,
      username,
      MailUser,
      year: new Date().getFullYear(),
    });

    const MailSchema = {
      from: MailUser,
      to: email,
      subject: "User Verification OTP",
      text: "You Got Email With Your User Verification OTP.",
      html: htmlContent,
    };

    const info = await transport.sendMail(MailSchema);

    if (info.response) {
      return "Otp Sent Successfully";
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default VerifyMail;
