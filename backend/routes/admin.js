const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const sendEmail = require("../config/mailer");  // <-- FIX #1 (Use mailer.js)
require("dotenv").config();

// -----------------------------
// GET - All appointments for admin
// -----------------------------
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1 });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// PUT - Update appointment status (approve / reject / cancel)
// -----------------------------
router.put("/appointments/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected", "cancelled", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Date formatting
    const formattedDate = new Date(appointment.appointmentDate)
      .toLocaleDateString("en-IN");

    // Prepare mail content
    const subject = `Your Appointment is ${status}`;
    const html = `
      <h2>Appointment ${status.toUpperCase()}</h2>
      <p>Hello <b>${appointment.patientName}</b>,</p>
      <p>Your appointment with Dr. <b>${appointment.doctorName}</b> (${appointment.speciality})</p>
      <p>On <b>${formattedDate}</b> at <b>${appointment.timeSlot}</b></p>
      <p>Has been <b>${status}</b>.</p>
      <br/>
      <p>Thank you for using our service.</p>
    `;

    // Send email
    await sendEmail(appointment.patientEmail, subject, html);  // <-- FIX #2 (await)

    res.json({
      success: true,
      message: `Status updated to ${status} & email sent successfully`,
      appointment,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

