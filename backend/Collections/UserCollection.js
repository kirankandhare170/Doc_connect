const newusers1 = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
require("dotenv").config();

// Unified mailers
const sendEmail = require("../config/mailer");       // for general emails (OTP, forgot password)
const sendContactEmail = require("../config/sendcontact"); // contact form

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ---------------------
// REGISTER WITH OTP
// ---------------------
exports.RegisterCollection = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone)
      return res.status(400).json({ success: false, message: "All fields are required" });

    if (password.length < 6)
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

    let existingUser = await newusers1.findOne({ email });

    if (existingUser) {
      if (!existingUser.isVerified) {
        if (existingUser.otpExpires < Date.now()) {
          await newusers1.deleteOne({ email });
        } else {
          return res.status(400).json({ success: false, message: "OTP already sent. Please verify your email." });
        }
      } else {
        return res.status(400).json({ success: false, message: "Email already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 min

    await newusers1.create({
      name,
      email,
      password: hashedPassword,
      phone,
      otp,
      otpExpires,
      isVerified: false,
    });

    await sendEmail(email, "Your Verification OTP", `
      <h2>Hello ${name}</h2>
      <p>Your verification OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `);

    res.json({ success: true, message: "OTP sent to your email. Please verify." });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

// ---------------------
// VERIFY OTP
// ---------------------
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await newusers1.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.isVerified) return res.status(400).json({ success: false, message: "Already verified" });
    if (user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });
    if (user.otpExpires < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({ success: true, message: "Email verified successfully!" });
  } catch (err) {
    console.error("OTP Verification Error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ---------------------
// LOGIN
// ---------------------
exports.LoginCollection = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: "Email and Password are required" });

    const user = await newusers1.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (!user.isVerified) return res.status(403).json({ success: false, message: "Please verify your email first" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

    const safeUser = user.toObject();
    delete safeUser.password;
    delete safeUser.otp;
    delete safeUser.otpExpires;

    res.json({ success: true, message: "Login successful", token, user: safeUser });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// ---------------------
// RESEND OTP
// ---------------------
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await newusers1.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.isVerified) return res.status(400).json({ success: false, message: "Already verified" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendEmail(email, "Your New OTP", `<h2>Your new OTP is:</h2> <h1>${otp}</h1>`);

    res.json({ success: true, message: "New OTP sent" });
  } catch (err) {
    console.error("Resend OTP Error:", err);
    res.status(500).json({ success: false, message: "Failed to resend OTP" });
  }
};

// ------------------
// FORGOT PASSWORD
// ------------------
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await newusers1.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(email, "Your Password Reset OTP", `<h2>Your OTP is:</h2> <h1>${otp}</h1>`);

    res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------
// VERIFY RESET OTP
// ------------------
exports.verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await newusers1.findOne({
      email,
      resetOtp: otp,
      resetOtpExpire: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired OTP" });

    res.json({ success: true, message: "OTP verified" });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------
// RESET PASSWORD
// ------------------
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await newusers1.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetOtp = null;
    user.resetOtpExpire = null;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ------------------
// CONTACT FORM
// ------------------
exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: "All fields are required" });

    await sendContactEmail({ fromEmail: email, to: process.env.ADMIN_EMAIL, subject: `New Contact Message from ${name}`, html: `<h2>New Contact Form Message</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b></p><p>${message}</p>`, text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` });

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
};

// ------------------
// GOOGLE AUTH
// ------------------
exports.googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
    const { email, name, sub: googleId, picture } = ticket.getPayload();

    let user = await newusers1.findOne({ email });
    if (!user) {
      user = await newusers1.create({ name, email, googleId, image: picture || "", isVerified: true });
    } else if (!user.googleId) {
      user.googleId = googleId;
      user.isVerified = true;
      user.image = picture || user.image;
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    return res.status(200).json({ success: true, message: "Google login successful", token: jwtToken, user, userId: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Google authentication failed", error: err.message });
  }
};

// ------------------
// GET & UPDATE PROFILE
// ------------------
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.body.userId;
    if (!userId) return res.status(400).json({ success: false, message: "User ID required" });

    const user = await newusers1.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user: { _id: user._id, name: user.name, email: user.email, phone: user.phone || "", image: user.image || "", googleId: user.googleId || null } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Profile Error", err: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone } = req.body;
    let updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      updateData.image = uploadResult.secure_url;
    }

    const updatedUser = await newusers1.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).send({ success: false, message: "User not found" });

    res.send({ success: true, message: "Profile Updated Successfully", user: updatedUser });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).send({ success: false, message: "Update Error", error: err.message });
  }
};
