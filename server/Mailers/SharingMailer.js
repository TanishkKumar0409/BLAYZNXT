import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const SharingMailer = async ({ email, id, message, username }) => {
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
      "../Templates/ShareFileTemplate.ejs"
    );
    const htmlContent = await ejs.renderFile(templatePath, {
      username,
      link: `${process.env.BASE_URL}/${id}`,
      message,
    });

    const MailSchema = {
      from: MailUser,
      to: email,
      subject: "Shared Files Email",
      text: "You Got Email With File Download Link",
      html: htmlContent,
    };

    await transport.sendMail(MailSchema);
  } catch (error) {
    console.error("Error sending verification email: ", error.message);
  }
};

export default SharingMailer;
