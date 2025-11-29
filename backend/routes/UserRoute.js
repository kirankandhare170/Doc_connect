const express = require("express");
const cloudinary = require('cloudinary').v2;
const {
  RegisterCollection,
  LoginCollection,
  getUserProfile,
   updateUserProfile,
  verifyEmail,
  verifyOtp,
  resendOtp,
  googleAuth,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  sendContactMessage,
} = require("../Collections/UserCollection");

const upload = require("../middlewares/multer");

const router = express.Router();

// ------------------- AUTH -------------------
router.post("/user/register", RegisterCollection);
router.post("/user/login", LoginCollection);

// ------------------- OTP --------------------
router.post("/user/verify-otp", verifyOtp);     // ✔ matches frontend
router.post("/user/resend-otp", resendOtp);     // ✔ NEW route
router.get("/verify-email/:token", verifyEmail);
router.post("/user/google-auth", googleAuth);

router.post("/user/forgot-password", forgotPassword);
router.post("/user/verify-reset-otp", verifyResetOtp);
router.post("/user/reset-password", resetPassword);

// ------------------ PROFILE -----------------
router.post("/user/contact", sendContactMessage);
router.get("/user/getuserprofile/:id", getUserProfile);
router.post("/user/updateProfile", upload.single("image"), updateUserProfile);


module.exports = router;
