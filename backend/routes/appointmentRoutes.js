const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST - Create new appointment
router.post("/", async (req, res) => {
  try {
    const { doctorId, doctorName, speciality, name, email, date, time } = req.body;

    if (!doctorId || !doctorName || !speciality || !name || !email || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const appointment = new Appointment({
      doctorId,
      doctorName,
      speciality,
      patientName: name,
      patientEmail: email,
      appointmentDate: date,
      timeSlot: time,
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET - All appointments (for admin)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1 });
    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET - Appointments by patient email
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const appointments = await Appointment.find({ patientEmail: email });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
});

// DELETE - Cancel appointment by ID
router.delete("/cancel/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const appt = await Appointment.findByIdAndDelete(id);

    if (!appt) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error while cancelling appointment" });
  }
});

module.exports = router;
