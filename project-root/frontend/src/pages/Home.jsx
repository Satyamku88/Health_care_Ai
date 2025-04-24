import React, { useState } from "react";
import "./Home.css";
import doctorImage from "../assets/doctor.jpg";
import chatbotImage from "../assets/chatbot.jpg";
import {
  FaHeartbeat,
  FaStethoscope,
  FaVideo,
  FaAmbulance,
  FaBook,
  FaWifi,
  FaMicrophone,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const testimonialsData = [
  {
    text: "This platform helped me get timely medical advice without traveling to the city.",
    author: "Ramesh S., Farmer",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    text: "The AI symptom checker is a lifesaver in remote areas.",
    author: "Priya M., Nurse",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "Emergency SOS helped us save a patient's life during a critical situation.",
    author: "Dr. Anil K., Rural Doctor",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
  },
  {
    text: "The health education guides are very helpful for our community.",
    author: "Sunita R., Community Worker",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
  },
];

const Home = () => {
  const [currentIndex] = useState(0);

  return (
    <div className="home">
      {/* Header Section */}
      <header className="header">
        <h1>AI Healthcare Platform</h1>
        <nav>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="/medicine-reminder">Medicine Reminder</a></li>
            <li><a href="/offline-access">Offline Access</a></li>
            <li><a href="/voice-assistance">Voice Assistance</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>AI-Powered Healthcare for Rural Communities</h2>
          <p>Bringing life-saving medical assistance to underserved areas.</p>
          <button
            className="cta-button"
            onClick={() => (window.location.href = "/symptom-checker")}
          >
            Check Symptoms Now
          </button>
        </div>
        <div className="hero-images">
          <img src={doctorImage} alt="Doctor" className="doctor-image" />
          <img src={chatbotImage} alt="AI Chatbot" className="chatbot-image" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Our Key Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <FaStethoscope className="feature-icon" />
            <h3>AI Symptom Checker</h3>
            <p>Instant medical insights based on your symptoms.</p>
            <button
              className="cta-button"
              onClick={() => (window.location.href = "/symptom-checker")}
            >
              Check Symptoms
            </button>
          </div>
          <div className="feature-item">
            <FaVideo className="feature-icon" />
            <h3>Teleconsultation</h3>
            <p>Connect with doctors via secure video calls.</p>
            <button
              className="cta-button"
              onClick={() => (window.location.href = "/teleconsultation")}
            >
              Book Consultation
            </button>
          </div>
          <div className="feature-item">
            <FaAmbulance className="feature-icon" />
            <h3>Emergency SOS</h3>
            <p>One-click emergency alerts with GPS location.</p>
            <button
              className="cta-button"
              onClick={() => (window.location.href = "/emergency-sos")}
            >
              Send SOS
            </button>
          </div>
          <div className="feature-item">
            <FaBook className="feature-icon" />
            <h3>Health Education</h3>
            <p>Interactive guides on maternal care, hygiene, and first aid.</p>
            <button
              className="cta-button"
              onClick={() => (window.location.href = "/educational-hub")}
            >
              Explore Hub
            </button>
          </div>
          <div className="feature-item">
            <FaWifi className="feature-icon" />
            <h3>Offline Accessibility</h3>
            <p>Access health content even in low-bandwidth areas.</p>
            <button
              className="cta-button"
              onClick={() => (window.location.href = "/offline-access")}
            >
              Learn More
            </button>
          </div>
          <div className="feature-item">
            <FaMicrophone className="feature-icon" />
            <h3>Voice-Activated Assistance</h3>
            <p>Navigate the app using voice commands.</p>
            <button
              className="cta-button"
              onClick={() => (window.location.href = "/voice-assistance")}
            >
              Try Now
            </button>
          </div>
          <div className="feature-item">
            <FaHeartbeat className="feature-icon" />
            <h3>Bloom</h3>
            <p>AI assistant chatbot for pregnancy ladies in rural areas.</p>
            <button
              className="cta-button"
              onClick={() => (window.location.href = "/bloom_assistant")}
            >
              Try Now
            </button>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <h2>User Stories</h2>
        <div className="testimonial-container">
          {testimonialsData.slice(currentIndex, currentIndex + 2).map(
            (testimonial, index) => (
              <div key={index} className="testimonial-card">
                <img
                  src={testimonial.avatar}
                  alt="User"
                  className="testimonial-avatar"
                />
                <p className="testimonial-text">"{testimonial.text}"</p>
                <h4 className="testimonial-author">- {testimonial.author}</h4>
              </div>
            )
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Get In Touch</h2>
        <p className="contact-description">
          We’d love to hear from you! Fill out the form below, or reach out via
          email, phone, or social media.
        </p>

        <div className="contact-container">
          {/* Contact Form */}
          <div className="contact-form">
            <div className="input-container">
              <input type="text" required />
              <label>Your Name</label>
            </div>
            <div className="input-container">
              <input type="email" required />
              <label>Your Email</label>
            </div>
            <div className="input-container">
              <textarea required placeholder="How can we help you?"></textarea>
              <label>Your Message</label>
            </div>
            <button type="submit" className="cta-button">
              Send Message
            </button>
          </div>

          {/* Contact Details & Map */}
          <div className="contact-info">
            <div className="contact-card">
              <FaEnvelope className="contact-icon" />
              <p>
                Email: <a href="mailto:support@aihealth.com">support@aihealth.com</a>
              </p>
            </div>
            <div className="contact-card">
              <FaPhone className="contact-icon" />
              <p>
                Phone: <a href="tel:+1234567890">+1 234 567 890</a>
              </p>
            </div>
            <div className="contact-card">
              <FaMapMarkerAlt className="contact-icon" />
              <p>123 Health Street, New York, USA</p>
            </div>
            {/* Map Integration */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 AI Healthcare Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;