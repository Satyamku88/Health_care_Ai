import React from "react";
import "./EducationalHub.css"; // Optional: Add styles for this page

const EducationalHub = () => {
  // Sample data for educational content
  const educationalContent = [
    {
      id: 1,
      title: "Maternal Care Guide",
      type: "article",
      description: "Learn about prenatal and postnatal care for mothers.",
      link: "/maternal-care-guide",
    },
    {
      id: 2,
      title: "Vaccination Schedule",
      type: "article",
      description: "A complete guide to vaccinations for infants and adults.",
      link: "/vaccination-schedule",
    },
    {
      id: 3,
      title: "Hygiene Tips",
      type: "video",
      description: "Watch this video to learn about maintaining proper hygiene.",
      link: "/hygiene-tips-video",
    },
    {
      id: 4,
      title: "First Aid Basics",
      type: "guide",
      description: "Step-by-step guide to handling common emergencies.",
      link: "/first-aid-basics",
    },
  ];

  return (
    <div className="educational-hub">
      <h1>Educational Hub</h1>
      <p>Explore health education resources to stay informed and healthy.</p>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search for topics..." />
        <button>Search</button>
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {educationalContent.map((item) => (
          <div key={item.id} className="content-card">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <a href={item.link} className="cta-button">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationalHub;