import nodemailer from "nodemailer";
import Users from "../../Modals/Users.js";

const VerifyMail = async ({ username, email, emailType }) => {
  try {
    const verifyOTP = Math.floor(Math.random() * 9000 + 1000);

    if (emailType === "VERIFY") {
      await Users.findOneAndUpdate(
        { username },
        {
          $set: {
            verifyOTP: verifyOTP,
            verifyOtpExpiry: Date.now() + 60000,
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

    const verifyLink = `http://localhost:3000/verify/${username}`;

    const MailSchema = {
      from: MailUser,
      to: email,
      subject: "Verifier",
      text: "You Got Email With File Download Link",
      html: `
      otp:${verifyOTP}
      <a href='${verifyLink}'>Verify</a>`,
    };

    const info = await transport.sendMail(MailSchema);
    console.log(info.response);

    if (info.response) {
      return "Otp Sent Successfully";
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default VerifyMail;
