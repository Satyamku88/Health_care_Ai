import React from "react";
import "./md.css";

const md = () => {
  const handleSOS = () => {
    alert("Emergency alert sent with your location. Help is on the way!");
  };

  return (
    <div className="emergency-sos">
      <h1>Emergency SOS</h1>
      <p>Press the button below to send an emergency alert with your location.</p>

      <button className="sos-button" onClick={handleSOS}>
        Send SOS
      </button>
    </div>
  );
};

export default md;