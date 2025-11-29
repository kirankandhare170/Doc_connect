// utils/sendEmail.js
//const nodemailer = require("nodemailer");

//const transporter = nodemailer.createTransport({
  //host: "smtp-relay.brevo.com",
  //port: 587,
  //secure: false,
//  auth: {
  // user: process.env.SMTP_USER,   
   // pass: process.env.SMTP_PASS 
 // }
//});

//module.exports = transporter;

// utils/sendEmail.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ---- 1️⃣ DEFAULT EXPORT: transporter (for old code) ----
module.exports = transporter;

// ---- 2️⃣ ADD sendOTP FUNCTION (for new forgot-password / verify OTP) ----
module.exports.sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from:` "Doc Connect" <${process.env.SMTP_SENDER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Your OTP</h2>
        <p>Use this OTP:</p>
        <h1 style="color:#4CAF50">${otp}</h1>
        <p>Valid for 10 minutes</p>
      `,
    });

    console.log("OTP sent:", email);
    return true;
  } catch (err) {
    console.log("Error sending OTP:", err);
    return false;
  }
};

