import {
  Lightbulb,
  Brain,
  Code2,
  Cpu,
  Radio,
  Bot,
  CircuitBoard,
  ArrowRight,
} from "lucide-react";

// import { Link } from "react-router-dom";

import AboutHero from "../../components/About/AboutHero/AboutHero.jsx";
// import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import CTASection from "../../components/CTASection/CTASection.jsx";
import WhoWeAre from "../../components/About/WhoWeAre/WhoWeAre.jsx";
import VisionMissionGoal from "../../components/About/VisionMissionGoal/VisionMissionGoal.jsx";
import Teaching from "../../components/About/Teaching/Teaching.jsx";

// import "./About.css";
import LearningApproach from "../../components/About/LearningApproach/LearningApproach.jsx";
import Skill from "../../components/About/Skill/Skill.jsx";
import WhyTechnology from "../../components/About/WhyTechnology/WhyTechnology.jsx";


const topics = [
  ["IoT", Radio],
  ["Electronics", CircuitBoard],
  ["Arduino", Cpu],
  ["Sensors", Radio],
  ["Robotics", Bot],
  ["Coding", Code2],
  ["Artificial Intelligence", Brain],
];

const approachSteps = [
  {
    number: "01",
    title: "Learn",
    text: "Understand the core idea.",
  },
  {
    number: "02",
    title: "Explore",
    text: "Experiment with tools and questions.",
  },
  {
    number: "03",
    title: "Build",
    text: "Build a working project.",
  },
  {
    number: "04",
    title: "Create",
    text: "Improve it and make it your own.",
  },
];

const benefits = [
  "Creativity",
  "Problem Solving",
  "Logical Thinking",
  "Practical Skills",
  "Innovation",
  "Confidence",
];

export default function About() {
  return (
    <>
      {/* =====================================================
          ABOUT HERO
      ===================================================== */}

      <AboutHero />
      <WhoWeAre />

      <VisionMissionGoal />
      <Teaching />
      <Skill />
      <LearningApproach />
      <WhyTechnology />
      {/* =====================================================
          ABOUT CONTENT
      ===================================================== */}

      <main className="about-page">
        {/* =====================================================
            WHO WE ARE
        ===================================================== */}

        {/* <section
          className="about-intro"
          data-animate="fade-up"
        >
          <div>
            <span className="eyebrow">
              WHO WE ARE
            </span>

            <h2>
              Learning becomes powerful when kids get to build.
            </h2>
          </div>

          <p>
            We create hands-on learning experiences around IoT,
            electronics, Arduino, sensors, robotics, coding and AI.
            The goal is to make technology learning simple,
            practical and exciting for every child.
          </p>
        </section> */}

        {/* =====================================================
            MISSION
        ===================================================== */}

        {/* <section className="mission-card" data-animate="pop">
          <div className="mission-icon">
            <Lightbulb size={30} />
          </div>

          <div className="mission-content">
            <span>OUR MISSION</span>

            <h2>
              To make technology learning simple, practical and exciting for
              every child.
            </h2>
          </div>
        </section> */}

        {/* =====================================================
            WHAT WE TEACH
        ===================================================== */}

        {/* <section className="about-section">
          <SectionTitle
            eyebrow="WHAT WE TEACH"
            title="Explore the technology behind everyday ideas"
          />

          <div className="topic-grid">
            {topics.map(([name, Icon], index) => (
              <div
                key={name}
                className="topic-card"
                data-animate="pop"
                data-delay={(index % 8) + 1}
              >
                <div className="topic-icon">
                  <Icon size={25} />
                </div>

                <b>{name}</b>
              </div>
            ))}
          </div>
        </section> */}

        {/* =====================================================
            LEARNING APPROACH
        ===================================================== */}

        {/* <section className="approach-section">
          <SectionTitle
            eyebrow="OUR LEARNING APPROACH"
            title="Learn → Explore → Build → Create"
          />

          <div className="approach-grid">
            {approachSteps.map((step, index) => (
              <div
                key={step.title}
                className="approach-card"
                data-animate="fade-up"
                data-delay={index + 1}
              >
                <span className="approach-number">{step.number}</span>

                <h3>{step.title}</h3>

                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section> */}

        {/* =====================================================
            WHY TECHNOLOGY
        ===================================================== */}

        {/* <section className="benefits-section" data-animate="fade-up">
          <div className="benefits-content">
            <span className="eyebrow">WHY TECHNOLOGY?</span>

            <h2>Skills that go beyond the classroom</h2>

            <p>
              Technology projects encourage children to think, test, make
              mistakes, solve problems and explain what they built.
            </p>
          </div>

          <div className="benefit-list">
            {benefits.map((item, index) => (
              <div
                key={item}
                className="benefit-item"
                data-animate="fade-right"
                data-delay={(index % 8) + 1}
              >
                <span>✓</span>

                {item}
              </div>
            ))}
          </div>
        </section> */}

        {/* =====================================================
            ABOUT CTA
        ===================================================== */}

        {/* <div className="about-cta">
          <Link to="/courses">
            Explore Courses
            <ArrowRight size={17} />
          </Link>
        </div> */}
      </main>

      {/* =====================================================
          COMMON CTA
      ===================================================== */}

      <CTASection />
    </>
  );
}
