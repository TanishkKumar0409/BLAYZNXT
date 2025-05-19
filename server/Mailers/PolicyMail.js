import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import ejs from "ejs";
import Contact from "../Models/ContactUs.js";
import Newsletter from "../Models/Newsletter.js";
import Users from "../Models/User.js";

const PolicyMail = async ({ title }) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const MailHost = process.env.MailHost;
    const MailPort = process.env.MailPort;
    const MailUser = process.env.MailUser;
    const MailPassword = process.env.MailPassword;

    let allEmail = new Set();

    const [allUsers, allNewsLetters, allQuery] = await Promise.all([
      Users.find(),
      Newsletter.find(),
      Contact.find(),
    ]);

    allUsers.forEach((user) => user?.email && allEmail.add(user.email));
    allNewsLetters.forEach((news) => news?.email && allEmail.add(news.email));
    allQuery.forEach((query) => query?.email && allEmail.add(query.email));

    allEmail = Array.from(allEmail);

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
      "../Templates/PolicyMailTemplate.ejs"
    );

    for (const email of allEmail) {
      const htmlContent = await ejs.renderFile(templatePath, {
        policyPage: `${process.env.FRONTEND_URL}/legal/${title
          ?.toLowerCase()
          .replace(/\s+/g, "-")}`,
        title: title,
      });

      const MailSchema = {
        from: MailUser,
        to: email,
        subject: `File Share ${title}`,
        text: `${title} has Been Updated`,
        html: htmlContent,
      };

      await transport.sendMail(MailSchema);
    }
  } catch (error) {
    console.error("Error sending emails: ", error.message);
  }
};

export default PolicyMail;
