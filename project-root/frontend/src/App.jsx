import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SymptomChecker from "./pages/SymptomChecker";
import Teleconsultation from "./pages/Teleconsultation";
import EmergencySOS from "./pages/EmergencySOS";
import EducationalHub from "./pages/EducationalHub";
import MedicineReminder from "./pages/MedicineReminder";
import OfflineAccess from "./pages/OfflineAccess";
import VoiceAssistance from "./pages/VoiceAssistance";
import Bloom from "./pages/Bloom";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/teleconsultation" element={<Teleconsultation />} />
        <Route path="/emergency-sos" element={<EmergencySOS />} />
        <Route path="/educational-hub" element={<EducationalHub />} />
        <Route path="/medicine-reminder" element={<MedicineReminder />} />
        <Route path="/offline-access" element={<OfflineAccess />} />
        <Route path="/voice-assistance" element={<VoiceAssistance />} />
        <Route path="/bloom_assistant" element={<Bloom />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;