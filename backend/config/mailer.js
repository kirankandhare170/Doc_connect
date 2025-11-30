const nodemailer = require("nodemailer");
require("dotenv").config();

// ---------------------
// CREATE SMTP TRANSPORTER
// ---------------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ---------------------
// SEND GENERAL EMAIL
// ---------------------
const sendEmail = async ({ fromEmail, to, subject, html, text }) => {
  try {
    await transporter.sendMail({
      from: fromEmail || `"Doc Connect" <${process.env.SMTP_SENDER}>`,
      to,
      subject,
      html,
      text,
      replyTo: fromEmail || process.env.SMTP_SENDER,
    });

    console.log("Email sent to:", to);
    return true;
  } catch (err) {
    console.error("Email Send Error:", err.message);
    return false;
  }
};

// ---------------------
// SEND OTP EMAIL
// ---------------------
const sendOTP = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"Doc Connect" <${process.env.SMTP_SENDER}>`,
      to,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP</h2>
        <p>Use this OTP:</p>
        <h1 style="color:#4CAF50">${otp}</h1>
        <p>Valid for 10 minutes</p>
      `,
    });

    console.log("OTP sent to:", to);
    return true;
  } catch (err) {
    console.error("Error sending OTP:", err.message);
    return false;
  }
};

// ---------------------
// SEND CONTACT FORM EMAIL
// ---------------------
const sendContactMessage = async ({ name, email, message }) => {
  try {
    await transporter.sendMail({
      from: `"Doc Connect Contact Form" <${process.env.SMTP_SENDER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message from ${name}`,
      html: `<h2>New Contact Form Message</h2>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Message:</b></p>
             <p>${message}</p>`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      replyTo: email,
    });

    console.log("Contact form email sent to admin");
    return true;
  } catch (err) {
    console.error("Contact form email error:", err.message);
    return false;
  }
};

module.exports = { transporter, sendEmail, sendOTP, sendContactMessage };
