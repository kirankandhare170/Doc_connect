const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,   // your smtp email
    pass: process.env.SMTP_PASS,   // app password / smtp key
  },
});

// Sends email to admin
const sendEmail = async ({ fromEmail, to, subject, html, text }) => {
  return transporter.sendMail({
    from: `" Doc Connect Contact Form" <${process.env.SMTP_SENDER }>`, // MUST BE SMTP USER
    to,                        // ADMIN EMAIL
    subject,
    html,
    text,
    replyTo: fromEmail,        // admin clicks reply → goes to user
  });
};

module.exports = sendEmail;
