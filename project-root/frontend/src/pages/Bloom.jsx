import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";  // Ensure this package is installed
import "./Bloom.css";

const Bloom = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesRef = useRef(null);
  const recognition = useRef(null);
  const synthesis = useRef(null);

  // Initialize Google Generative AI (make sure you have installed @google/generative-ai)
  const apiKey = "AIzaSyBqNIGGpFxZdVKtTyJTHc_PY9XTZlsuV0s"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-pro-exp-02-05",
    systemInstruction:
      "You are Bloom, a compassionate pregnancy support assistant. Provide empathetic, medically accurate information about prenatal care, nutrition, and pregnancy-related concerns. Always maintain a supportive and reassuring tone. Speak responses naturally and conversationally."
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const chatSession = model.startChat({ generationConfig });

  const speakMessage = (text) => {
    if (synthesis.current) {
      synthesis.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      synthesis.current.speak(utterance);
    }
  };

  useEffect(() => {
    // Initialize speech recognition if supported
    if ("webkitSpeechRecognition" in window) {
      recognition.current = new window.webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserInput(transcript);
        handleSendMessage(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }

    // Initialize speech synthesis if supported
    if ("speechSynthesis" in window) {
      synthesis.current = window.speechSynthesis;
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, []);

  const handleSendMessage = async (message = userInput) => {
    const cleanMessage = message.trim();
    if (!cleanMessage) return;

    setMessages((prev) => [
      ...prev,
      { text: cleanMessage, sender: "user", timestamp: new Date().toLocaleTimeString() },
    ]);
    setUserInput("");
    setIsTyping(true);

    try {
      const result = await chatSession.sendMessage(cleanMessage);
      const response = await result.response.text();
      setMessages((prev) => [
        ...prev,
        { text: response, sender: "bot", timestamp: new Date().toLocaleTimeString() },
      ]);
      speakMessage(response);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm having trouble connecting right now. Please try again later.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString()
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognition.current) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
    }
    setIsListening(!isListening);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="bloom-container">
      <div className="bloom-header">
        <h1>Bloom: AI Pregnancy Assistant</h1>
        <p>Providing pregnancy guidance and support for rural women.</p>
        <button className="cta-button" onClick={toggleVoiceInput}>
          {isListening ? "Stop Listening" : "Start Voice Assistant"}
        </button>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <h1>Bloom - Your Pregnancy Companion 🌸</h1>
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.length === 0 && (
            <div className="welcome-message">
              <h2>How can I assist you today?</h2>
              <p>Ask me about pregnancy, nutrition, or healthcare.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}-message`}>
              <span>{message.text}</span>
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          ))}
          {isTyping && <div className="typing-indicator">Typing...</div>}
        </div>
        <div className="input-container">
          <input
            type="text"
            className="chat-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type or use voice input..."
          />
          <button className="send-button" onClick={() => handleSendMessage()}>
            Send
          </button>
        </div>
      </div>

      <button className={`voice-button ${isListening ? "listening" : ""}`} onClick={toggleVoiceInput}>
        {isListening ? "🎙️" : "🔊"}
      </button>
    </div>
  );
};

export default Bloom;
