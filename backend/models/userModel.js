////const mongoose = require("mongoose");

//const userSchema = new mongoose.Schema(
  //{
   // name: { type: String, required: true },
   // email: { type: String, required: true, unique: true },
   // password: { type: String, required: true },
   // phone: { type: String, required: true },
   // image: { type: String, default: "" },
 // },
  //{ timestamps: true }
//);

//module.exports = mongoose.model("newusers1", userSchema);

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: function() { return !this.googleId; } // required only for normal users
  },
  phone: { 
    type: String, 
    required: function() { return !this.googleId; } // required only for normal users
  },
  image: { type: String, default: "" },

  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
  resetOtp: { type: String },
  resetOtpExpire: { type: Date },

  googleId: { type: String }, // optional
}, 
{ timestamps: true });

module.exports = mongoose.model("newusers1", userSchema);
