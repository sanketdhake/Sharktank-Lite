const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, messageContent) => {
  try {
    //create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "sdktp1209@gmail.com",
        pass: "qnan qrmo oecx kirj",
      },
    });
    //message obj
    const message = {
      to: to,
      subject: subject,
      html: `
            <p>${messageContent}</p>
            <p>Regards</p>
            <p>Sharktank Lite</p>
            `,
    };
    //send the email
    const info = await transporter.sendMail(message);
    //console.log("Message sent", info.messageId);
  } catch (error) {
    console.log(error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
