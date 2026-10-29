import { ArrowRight, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

import LearningCard1 from "../../../assets/Home/LearningSection/LearningCard_1.png";
import LearningCard2 from "../../../assets/Home/LearningSection/LearningCard_2.png";
import LearningCard3 from "../../../assets/Home/LearningSection/LearningCard_3.png";
import LearningCard4 from "../../../assets/Home/LearningSection/LearningCard_4.png";
import LearningSection1 from "../../../assets/Home/LearningSection/LearningSection_1.png";
import LearningSection2 from "../../../assets/Home/LearningSection/LearningSection_2.png";

import "./LearningSection.css";

const learningSteps = [
  {
    number: "01",
    title: "Learn",
    text: "Understand how sensors, circuits and IoT work.",
    image: LearningCard1,
    className: "learn-card",
  },
  {
    number: "02",
    title: "Explore",
    text: "Ask questions and experiment with components.",
    image: LearningCard2,
    className: "explore-card",
  },
  {
    number: "03",
    title: "Build",
    text: "Turn ideas into real IoT projects using sensors, Arduino & ESP32.",
    image: LearningCard3,
    className: "build-card",
  },
  {
    number: "04",
    title: "Create",
    text: "Share, improve and innovate by building smart solutions for a better tomorrow.",
    image: LearningCard4,
    className: "create-card",
  },
];

export default function LearningSection() {
  return (
    <section className="learning-section">
      <img
        src={LearningSection1}
        alt=""
        className="learning-section-image learning-section-image-left"
        aria-hidden="true"
      />

      <img
        src={LearningSection2}
        alt=""
        className="learning-section-image learning-section-image-right"
        aria-hidden="true"
      />

      <header className="learning-header">
        <div className="learning-eyebrow">
          <span className="learning-eyebrow-line" aria-hidden="true" />
          <span>LEARN BY DOING</span>
          <span className="learning-eyebrow-line" aria-hidden="true" />
        </div>

        <h2>
          Technology made practical
          <br />
          for <span>curious minds</span>
        </h2>

        <p>
          A simple path from understanding the idea to building something
          kids can see, test and improve.
        </p>
      </header>

      <div className="learning-cards">
        {learningSteps.map((step) => (
          <article
            key={step.number}
            className={`learning-card ${step.className}`}
          >
            <div className="learning-number">{step.number}</div>

            <div className="learning-illustration">
              <img src={step.image} alt={step.title} loading="lazy" />
            </div>

            <div className="learning-card-content">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="learning-cta">
        <div className="learning-cta-title">
          <Sprout size={25} aria-hidden="true" />
          <span>Ready to build your first project?</span>
        </div>

        <Link to="/courses" className="learning-cta-button">
          Explore Our Courses
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
