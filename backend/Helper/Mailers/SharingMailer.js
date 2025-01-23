import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const SharingMailer = async ({ email, downloadLink, message, username }) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

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
      "../../Templates/EmailTemplate.ejs"
    );
    const htmlContent = await ejs.renderFile(templatePath, {
      downloadLink,
      message,
      username,
      MailUser,
      year: new Date().getFullYear(),
    });

    const MailSchema = {
      from: MailUser,
      to: email,
      subject: "Shared Files Email",
      text: "You Got Email With File Download Link",
      html: htmlContent,
    };

    const info = await transport.sendMail(MailSchema);
    console.log(info.response);
  } catch (error) {
    console.error("Error sending verification email: ", error.message);
  }
};

export default SharingMailer;
