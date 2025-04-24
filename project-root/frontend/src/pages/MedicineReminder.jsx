import React, { useState } from "react";
import "./MedicineReminder.css";

const MedicineReminder = () => {
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");

  const handleAddReminder = () => {
    alert(`Reminder set for ${medicine} at ${time}.`);
  };

  return (
    <div className="medicine-reminder">
      <h1>Medicine Reminder</h1>
      <p>Set reminders for your medications.</p>

      <div className="form-container">
        <div className="input-container">
          <label>Medicine Name</label>
          <input
            type="text"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            placeholder="Enter medicine name"
          />
        </div>

        <div className="input-container">
          <label>Reminder Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <button className="cta-button" onClick={handleAddReminder}>
          Set Reminder
        </button>
      </div>
    </div>
  );
};

export default MedicineReminder;