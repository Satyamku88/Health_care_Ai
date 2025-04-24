import React, { useState } from "react";
import { FaMicrophone, FaPaperPlane, FaRobot, FaUser, FaGlobe } from "react-icons/fa";

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

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const userEntry = { sender: "user", message: userMessage };
    setChatLog((prevLog) => [...prevLog, userEntry]);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yourwebsite.com",
          "X-Title": "Your App Name",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            { role: "system", content: `You are a multilingual medical specialist. Respond in ${languages[selectedLanguage]}.` },
            { role: "user", content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API error! Status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data.choices?.[0]?.message?.content || "No response from bot";
      const botEntry = { sender: "bot", message: botMessage };

      setChatLog((prevLog) => [...prevLog, botEntry]);
      speakText(botMessage, selectedLanguage);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setChatLog((prevLog) => [...prevLog, { sender: "bot", message: "Error retrieving response. Check API key & endpoint." }]);
    }

    setUserMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Speech-to-Text (Voice Input)
  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = selectedLanguage;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setUserMessage(spokenText);
      handleSend();
    };

    recognition.start();
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
    <div style={styles.container}>
      <h1 style={styles.heading}>🤖 AI Health Chatbot</h1>
      
      <div style={styles.languageSelector}>
        <FaGlobe style={{ marginRight: "8px" }} />
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          style={styles.select}
        >
          {Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.chatLog}>
        {chatLog.map((entry, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: entry.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: entry.sender === "user" ? "#DCF8C6" : "#FFF",
            }}
          >
            {entry.sender === "user" ? <FaUser color="#007BFF" /> : <FaRobot color="#28a745" />}
            <strong>{entry.sender === "user" ? "You" : "Bot"}:</strong> {entry.message}
          </div>
        ))}
      </div>

      <div style={styles.inputContainer}>
        <button onClick={handleVoiceInput} style={styles.voiceButton}>
          <FaMicrophone /> {isListening ? "Listening..." : "Speak"}
        </button>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type or Speak..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    width: "650px", // Increased width
    margin: "20px auto",
    border: "1px solid #ccc",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#333",
    marginBottom: "10px",
  },
  languageSelector: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  select: {
    fontSize: "16px",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  chatLog: {
    flex: 1,
    padding: "10px",
    height: "500px", // Increased height
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderRadius: "8px",
  },
  message: {
    padding: "12px",
    borderRadius: "10px",
    maxWidth: "80%",
    boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #ccc",
    alignItems: "center",
    padding: "10px",
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "16px",
    borderRadius: "5px",
  },
  sendButton: {
    padding: "12px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "5px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  voiceButton: {
    padding: "12px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
    marginRight: "5px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
};

export default Chatbot;
