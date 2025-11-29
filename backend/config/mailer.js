const nodemailer = require("nodemailer");
require("dotenv").config();

// Create SMTP transporter (Brevo)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,    // smtp-relay.brevo.com
  port: process.env.SMTP_PORT,    // 587
  secure: false,                  // TLS
  auth: {
    user: process.env.SMTP_USER,  // your Brevo SMTP login
    pass: process.env.SMTP_PASS,  // your Brevo SMTP password
  },
});

// Send Email Function
const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from:` "Doc Connect" <${process.env.SMTP_SENDER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent to:", to);
  } catch (err) {
    console.error("Email Send Error:", err.message);
  }
};

module.exports = sendEmail;
