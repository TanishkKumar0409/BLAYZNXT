import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const DeleteAccountMail = async (email, otp) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const MailHost = process.env.MailHost;
    const MailPort = parseInt(process.env.MailPort);
    const MailUser = process.env.MailUser;
    const MailPassword = process.env.MailPassword;

    const transport = nodemailer.createTransport({
      host: MailHost,
      port: MailPort,
      secure: MailPort === 465,
      auth: {
        user: MailUser,
        pass: MailPassword,
      },
    });

    const templatePath = path.join(
      __dirname,
      "../Templates/DeleteUserTemplate.ejs"
    );

    const htmlContent = await ejs.renderFile(templatePath, {
      otp: otp,
    });

    const mailOptions = {
      from: MailUser,
      to: email,
      subject: "Account Deletion OTP",
      text: `Your OTP for account deletion is: ${otp}`,
      html: htmlContent,
    };

    await transport.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send OTP email");
  }
};

export default DeleteAccountMail;
