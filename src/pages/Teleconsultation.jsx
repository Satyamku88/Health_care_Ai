import React, { useState } from "react";
import axios from "axios";
import "./Teleconsultation.css";

const Teleconsultation = () => {
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [googleMeetLink, setGoogleMeetLink] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  // Generate random Google Meet ID (12-character lowercase + numbers)
  const generateMeetId = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 12 }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  // Book consultation and generate Meet link
  const handleBookConsultation = async () => {
    if (!doctor || !date || !time) {
      alert("Please fill in all fields before booking.");
      return;
    }

    // Generate new Meet link
    const meetId = generateMeetId();
    const newMeetLink = `https://meet.google.com/auo-kvhw-cnc`;
    setGoogleMeetLink(newMeetLink);

    const formData = {
      name: doctor,
      date: date,
      time: time,
      email: "doctor@example.com", // Replace with dynamic value as needed
      googleMeetLink: newMeetLink,
    };

    try {
      const response = await axios.post("https://api.web3forms.com/submit", {
        ...formData,
        access_key: "afb8c4fd-c502-4d01-b1a0-9bf48e319946",
      });

      if (response.data.success) {
        setIsBooked(true);
        alert(`Consultation booked with ${doctor} on ${date} at ${time}. Email sent successfully!`);
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email. Please try again.");
    }
  };

  return (
    <div className="teleconsultation">
      <h1>Teleconsultation</h1>
      <p>Book a video/audio consultation with a doctor.</p>

      <div className="form-container">
        {/* Input fields remain unchanged */}
        <div className="input-container">
          <label htmlFor="doctor">Select Doctor</label>
          <select
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
          >
            <option value="">Choose a doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Lee">Dr. Lee</option>
          </select>
        </div>

        <div className="input-container">
          <label htmlFor="date">Select Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label htmlFor="time">Select Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Removed Generate Link Button */}

        {/* Book Consultation Button */}
        <button className="cta-button" onClick={handleBookConsultation}>
          Book Consultation
        </button>

        {/* Show link ONLY after booking */}
        {isBooked && (
          <div className="join-meeting-container">
            <p>Your consultation is booked! Click below to join:</p>
            <a
              href={googleMeetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="join-meeting-button"
            >
              Join Google Meet
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teleconsultation;