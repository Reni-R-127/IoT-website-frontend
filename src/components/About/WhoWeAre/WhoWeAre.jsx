import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Box,
  Users,
  Cpu,
  Lightbulb,
  BarChart3,
  Star,
  BadgeCheck,
} from "lucide-react";

import whoWeAreImage from "../../../assets/About/WhoWeAre/who-we-are.png";
import "./WhoWeAre.css";

const featureCards = [
  {
    title: "Hands-on Learning",
    text: "Learn by doing and experimenting.",
    icon: Cpu,
    className: "who-feature-blue",
  },
  {
    title: "Learn by Creating",
    text: "Turn ideas into real projects.",
    icon: Lightbulb,
    className: "who-feature-yellow",
  },
  {
    title: "Future-Ready Skills",
    text: "Build skills for a brighter tomorrow.",
    icon: BarChart3,
    className: "who-feature-purple",
  },
];

const trustItems = [
  {
    value: 4.9,
    suffix: "/5",
    label: "Student Reviews",
    type: "rating",
    icon: Star,
    className: "who-trust-rating",
    decimals: 1,
  },
  {
    value: 200,
    suffix: "+",
    label: "Students Trained",
    type: "students",
    icon: Users,
    className: "who-trust-students",
  },
  {
    value: null,
    suffix: "",
    label: "Certified Trainers",
    type: "certified",
    icon: BadgeCheck,
    className: "who-trust-certified",
  },
  {
    value: 6,
    suffix: "+",
    label: "Learning Areas",
    type: "learning",
    icon: BookOpen,
    className: "who-trust-learning",
  },
  {
    value: 20,
    suffix: "+",
    label: "Practical Projects",
    type: "projects",
    icon: Box,
    className: "who-trust-projects",
  },
  {
    value: 100,
    suffix: "%",
    label: "Hands-on Learning",
    type: "hands-on",
    icon: Cpu,
    className: "who-trust-hands-on",
  },
];

function useCountUp(target, active, decimals = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target == null || !active) {
      setCount(0);
      return undefined;
    }

    let frameId;
    let startTime;

    // Slower count-up: 4 seconds each time the section enters the viewport.
    const duration = 4000;
    const animate = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const precision = 10 ** decimals;
      const nextCount =
        Math.round(target * easedProgress * precision) / precision;

      setCount(nextCount);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [target, active, decimals]);

  return count;
}

function TrustCard({ item, active, index }) {
  const Icon = item.icon;
  const count = useCountUp(item.value, active, item.decimals ?? 0);
  const displayValue =
    item.type === "certified" ? "✓" : `${count}${item.suffix}`;

  return (
    <article
      className={`who-trust-card ${item.className}`}
      style={{ "--reveal-order": index }}
    >
      <div className="who-trust-icon" aria-hidden="true">
        <Icon size={23} strokeWidth={2.3} />
      </div>
      <div className="who-trust-copy">
        <strong aria-label={displayValue}>{displayValue}</strong>
        <span>{item.label}</span>
      </div>
    </article>
  );
}

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reset when leaving so the complete reveal and counters replay on re-entry.
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`who-we-are ${isVisible ? "who-is-visible" : ""}`}
      aria-labelledby="who-heading"
    >
      <div className="who-circle who-circle-top-left" aria-hidden="true" />
      <div className="who-circle who-circle-top-right" aria-hidden="true" />
      <div className="who-circle who-circle-bottom-left" aria-hidden="true" />
      <div className="who-circle who-circle-bottom-right" aria-hidden="true" />

      <div className="who-we-are-container">
        <header className="who-section-heading">
          <div className="who-heading-row">
            <span className="who-eyebrow-line" aria-hidden="true" />
            <span className="who-eyebrow">WHO WE ARE</span>
            <span className="who-eyebrow-line" aria-hidden="true" />
          </div>
        </header>

        <div className="who-content">
          <h2 id="who-heading">
            Learning becomes
            <br />
            powerful when kids
            <br />
            get to <strong>build.</strong>
          </h2>

          <p className="who-description">
            We create hands-on learning experiences around IoT, electronics,
            Arduino, sensors, robotics, coding and AI. Our goal is to make
            technology learning simple, practical and exciting for every child.
          </p>
        </div>

        <div className="who-visual">
          <div className="who-image-glow" aria-hidden="true" />
          <div className="who-orbit who-orbit-one" aria-hidden="true" />
          <div className="who-orbit who-orbit-two" aria-hidden="true" />
          <img
            src={whoWeAreImage}
            alt="Children learning and building technology projects"
            className="who-image"
            loading="lazy"
          />
        </div>

        <div className="who-feature-grid" aria-label="Learning benefits">
          {featureCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`who-feature-card ${item.className}`}
                style={{ "--reveal-order": index }}
              >
                <div className="who-feature-icon" aria-hidden="true">
                  <Icon size={27} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="who-trust-grid" aria-label="Our learning highlights">
          {trustItems.map((item, index) => (
            <TrustCard
              key={item.type}
              item={item}
              index={index}
              active={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
