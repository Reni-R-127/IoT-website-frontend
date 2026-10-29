import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Lightbulb,
  Target,
  Sparkles,
  Wrench,
  Users,
  Brain,
  Code2,
  Rocket,
} from "lucide-react";

import visionImage from "../../../assets/About/VisionMissionGoal/vision.png";
import missionImage from "../../../assets/About/VisionMissionGoal/mission.png";
import goalImage from "../../../assets/About/VisionMissionGoal/goal.png";

import "./VisionMissionGoal.css";

/* =========================================================
   VISION / MISSION / GOAL DATA
========================================================= */

const slides = [
  {
    id: "vision",
    number: "01",
    tab: "Vision",

    label: "OUR VISION",
    icon: Eye,

    heading: (
      <>
        A future where every
        <br />
        child is a <span>creator,</span>
        <br />
        not just a consumer.
      </>
    ),

    description:
      "We envision a world where every child has the confidence, skills and opportunities to use technology to solve real problems and create a better tomorrow.",

    image: visionImage,

    features: [
      {
        icon: Lightbulb,
        title: "Curious Minds",
        text: "Explore and discover",
        className: "vision-yellow",
      },
      {
        icon: Rocket,
        title: "Creative Ideas",
        text: "Imagine without limits",
        className: "vision-purple",
      },
      {
        icon: Sparkles,
        title: "Bright Future",
        text: "Skills for tomorrow",
        className: "vision-green",
      },
    ],

    theme: "theme-vision",
  },

  {
    id: "mission",
    number: "02",
    tab: "Mission",

    label: "OUR MISSION",
    icon: Lightbulb,

    heading: (
      <>
        To make technology
        <br />
        learning <span>simple, practical</span>
        <br />
        and <span>exciting</span> for every child.
      </>
    ),

    description:
      "We provide hands-on learning experiences that help children understand, build and explore technology in a fun and engaging way.",

    image: missionImage,

    features: [
      {
        icon: Wrench,
        title: "Learn by Doing",
        text: "Build instead of watching",
        className: "mission-blue",
      },
      {
        icon: Code2,
        title: "Real Projects",
        text: "Turn ideas into reality",
        className: "mission-cyan",
      },
      {
        icon: Users,
        title: "Guided Learning",
        text: "Learn with support",
        className: "mission-orange",
      },
    ],

    theme: "theme-mission",
  },

  {
    id: "goal",
    number: "03",
    tab: "Goal",

    label: "OUR GOAL",
    icon: Target,

    heading: (
      <>
        To build a generation
        <br />
        of <span className="purple-text">curious, creative</span> and
        <br />
        <span>future-ready problem solvers.</span>
      </>
    ),

    description:
      "We aim to empower children with practical skills, innovative thinking and real-world knowledge to create meaningful solutions for a brighter future.",

    image: goalImage,

    features: [
      {
        icon: Brain,
        title: "Problem Solvers",
        text: "Think and find solutions",
        className: "goal-purple",
      },
      {
        icon: Code2,
        title: "Future Skills",
        text: "Prepare for tomorrow",
        className: "goal-blue",
      },
      {
        icon: Sparkles,
        title: "Real Impact",
        text: "Create ideas that matter",
        className: "goal-yellow",
      },
    ],

    theme: "theme-goal",
  },
];

export default function VisionMissionGoal() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [direction, setDirection] = useState("next");

  const activeSlide = slides[activeIndex];

  const ActiveIcon = activeSlide.icon;

  /* =========================================================
     NEXT SLIDE
  ========================================================= */

  const nextSlide = () => {
    setDirection("next");

    setActiveIndex((current) => (current + 1) % slides.length);
  };

  /* =========================================================
     PREVIOUS SLIDE
  ========================================================= */

  const previousSlide = () => {
    setDirection("previous");

    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  /* =========================================================
     SELECT SLIDE
  ========================================================= */

  const selectSlide = (index) => {
    if (index === activeIndex) {
      return;
    }

    setDirection(index > activeIndex ? "next" : "previous");

    setActiveIndex(index);
  };

  /* =========================================================
     AUTO CAROUSEL
  ========================================================= */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection("next");

      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6500);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section
      className="vision-mission-goal"
      aria-label="Vision Mission and Goal"
    >
      <div className="vmg-wrapper">
        {/* =================================================
            MAIN CAROUSEL
        ================================================= */}

        <div className="vmg-carousel">
          {/* =================================================
              ACTIVE SLIDE
          ================================================= */}

          <article key={activeSlide.id} className={`vmg-slide ${direction}`}>
            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="vmg-content">
              {/* LABEL */}

              <div className={`vmg-label ${activeSlide.theme}`}>
                <span className="vmg-label-icon">
                  <ActiveIcon size={25} strokeWidth={2.5} />
                </span>

                <span>{activeSlide.label}</span>
              </div>

              {/* HEADING */}

              <h2>{activeSlide.heading}</h2>

              {/* DESCRIPTION */}

              <p className="vmg-description">{activeSlide.description}</p>

              {/* =================================================
                  HIGHLIGHT CARDS
              ================================================= */}

              <div className="vmg-feature-grid">
                {activeSlide.features.map((feature) => {
                  const FeatureIcon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className={`vmg-feature ${feature.className}`}
                    >
                      <span className="vmg-feature-icon">
                        <FeatureIcon size={23} strokeWidth={2.3} />
                      </span>

                      <span className="vmg-feature-text">
                        <strong>{feature.title}</strong>

                        <small>{feature.text}</small>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                IMAGE
            ================================================= */}

            <div className="vmg-image-area">
              <img
                src={activeSlide.image}
                alt={`${activeSlide.tab} illustration`}
                className="vmg-image"
              />
            </div>
          </article>
        </div>

        {/* =================================================
            CAROUSEL NAVIGATION
        ================================================= */}

        <div className="vmg-navigation">
          {/* PREVIOUS */}

          <button
            type="button"
            className="vmg-nav-button"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={27} strokeWidth={3} />
          </button>

          {/* SLIDE INDICATORS */}

          <div className="vmg-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className={`vmg-indicator ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => selectSlide(index)}
                aria-label={`Go to ${slide.tab}`}
                aria-current={index === activeIndex ? "true" : undefined}
              >
                <strong>{slide.number}</strong>

                <span>{slide.tab}</span>
              </button>
            ))}
          </div>

          {/* NEXT */}

          <button
            type="button"
            className="vmg-nav-button"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={27} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
}
