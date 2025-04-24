import React, { useState } from "react";
import "./SymptomChecker.css";
import { FaMicrophone, FaGlobe } from "react-icons/fa";

const languages = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  hi: "हिन्दी",
  zh: "中文",
  ar: "العربية",
  ru: "Русский",
};

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");
  const [remedy, setRemedy] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const API_KEY = "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"; // ⚠️ Do NOT expose API keys in production!

  const handleCheckSymptoms = async () => {
    if (!symptoms) {
      alert("Please enter symptoms.");
      return;
    }

    setLoading(true);
    setResult("");
    setRemedy("");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            { role: "system", content: `You are a multilingual health assistant. Respond in ${languages[selectedLanguage]}.` },
            { role: "user", content: `What disease matches these symptoms: ${symptoms}?` },
            { role: "user", content: `Provide a simple home remedy for this condition in ${languages[selectedLanguage]}.` },
          ],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const diagnosis = data.choices?.[0]?.message?.content || "No diagnosis found.";
        const remedyText = data.choices?.[1]?.message?.content || "Drink water, rest, and consult a doctor if needed.";

        setResult(diagnosis);
        setRemedy(remedyText);

        // Speak out the diagnosis and home remedy in the selected language
        speakText(`${diagnosis}. ${remedyText}`, selectedLanguage);
      } else {
        setResult("Error fetching data. Please try again.");
      }
    } catch (error) {
      console.error("API error:", error);
      setResult("An error occurred. Try again later.");
    }

    setLoading(false);
  };

  // Speech-to-Text (Voice Input)
  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = selectedLanguage;
    recognition.start();

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSymptoms(transcript);
    };

    recognition.onend = () => setIsListening(false);
  };

  // Text-to-Speech (Voice Output)
  const speakText = (text, lang) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = lang;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="symptom-checker">
      <h1>🤖 AI Symptom Checker</h1>
      <p>Enter your symptoms below to get AI-driven health insights.</p>

      {/* Language Selector with Larger Size */}
      <div className="language-selector">
        <FaGlobe style={{ marginRight: "8px", fontSize: "24px" }} />
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          style={{
            fontSize: "18px",
            padding: "10px",
            borderRadius: "8px",
            border: "2px solid #007BFF",
          }}
        >
          {Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-container">
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms..."
        />
        <button className="voice-button" onClick={startListening} disabled={isListening}>
          <FaMicrophone />
        </button>
      </div>

      <button className="cta-button" onClick={handleCheckSymptoms} disabled={loading}>
        {loading ? "Checking..." : "Check Symptoms"}
      </button>

      {result && (
        <div className="result">
          <h2>Analysis Result</h2>
          <p><strong>Diagnosis:</strong> {result}</p>
          <p><strong>Home Remedy:</strong> {remedy}</p>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
