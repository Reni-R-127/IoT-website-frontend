
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Lightbulb,
  Target,
  Brain,
  Wrench,
  Rocket,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

import whyTechnologyImage from "../../../assets/About/WhyTechnology/why-technology-transparent.png";
import "./WhyTechnology.css";

const strengths = [
  { title: "Creativity", icon: Lightbulb, tone: "purple" },
  { title: "Problem Solving", icon: Target, tone: "pink" },
  { title: "Logical Thinking", icon: Brain, tone: "blue" },
  { title: "Practical Skills", icon: Wrench, tone: "green" },
  { title: "Innovation", icon: Rocket, tone: "yellow" },
  { title: "Confidence", icon: BarChart3, tone: "cyan" },
];

export default function WhyTechnology() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`why-technology${isVisible ? " is-visible" : ""}`}
      aria-labelledby="why-tech-heading"
    >
      <div
        className="why-tech-decoration why-tech-decoration-left"
        aria-hidden="true"
      />

      <div
        className="why-tech-decoration why-tech-decoration-right"
        aria-hidden="true"
      />

      <div className="why-tech-container">
        {/* Heading */}
        <header className="why-tech-heading why-reveal">
          <div className="why-tech-eyebrow">
            <span className="why-tech-line" aria-hidden="true" />
            <span>WHY TECHNOLOGY?</span>
            <span className="why-tech-line" aria-hidden="true" />
          </div>

          <h2 id="why-tech-heading">
            Skills that go beyond
            <br className="why-tech-desktop-break" /> the classroom
          </h2>
        </header>

        {/* Description */}
        <p className="why-tech-description why-reveal">
          Technology projects encourage children to think, test, make
          mistakes, solve problems and explain what they build.
        </p>

        {/* Image: right on desktop, above cards on tablet/mobile */}
        <div className="why-tech-visual why-reveal">
          <img
            src={whyTechnologyImage}
            alt="Children learning technology through robotics, coding and electronics"
            className="why-tech-image"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Skill cards */}
        <div className="why-tech-skills">
          {strengths.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={`why-tech-skill why-tech-${item.tone} why-reveal`}
                style={{
                  transitionDelay: isVisible ? `${index * 70}ms` : "0ms",
                }}
              >
                <span className="why-tech-skill-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={2.3} />
                </span>

                <span className="why-tech-skill-title">
                  {item.title}
                </span>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <Link to="/courses" className="why-tech-button why-reveal">
          <span>Explore Courses</span>
          <ArrowRight size={19} strokeWidth={2.6} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
